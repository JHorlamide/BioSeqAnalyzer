/* React */
import { Fragment, useEffect, useRef, useState } from 'react';

/* Chakra UI */
import { Box, Text } from '@chakra-ui/react';

/* Libraries */
import { PluginSpec } from 'molstar/lib/mol-plugin/spec';
import { SeqViz } from "seqviz";
import seqparse, { Seq } from "seqparse"

/* Application Modules */
import { FILE_FORMAT, PDB_BASE_URL } from '../../../../../../config/AppConfig';
import useErrorToast from '../../../../../../hooks/useErrorToast';

interface Props {
  proteinPDBID?: string;
  containerStyle: object;
  proteinAminoAcidSequence?: string;
}

const SeqVizStyle = {
  height: "16vw",
  width: "100",
  overflow: "hidden",
  overflowX: "hidden",
  overflowY: "hidden"
}

const EmptyProteinSeqViewer = () => {
  return (
    <Box
      bg="brand_blue.300"
      width="full"
      justifyContent="center"
      alignItems="center"
      borderRadius={8}
      paddingY={40}
      marginTop="20%"
    >
      <Text textAlign="center" color="white">
        No Protein PDB ID Provided. To view protein structure please provide a PDB ID
      </Text>
    </Box>
  )
}

const ProteinSequenceViewer = (props: Props) => {
  const { handleOnError } = useErrorToast();
  const [seq, setSeq] = useState<Seq>();
  const { proteinPDBID, containerStyle, proteinAminoAcidSequence } = props
  let seqVizAnnotation;

  if (seq && seq.annotations.length > 0) {
    seqVizAnnotation = seq.annotations || [{
      name: String(seq?.name),
      start: 0,
      end: 34,
      direction: 1,
      color: "#08355a"
    }];
  }

  if (!proteinPDBID) {
    return <EmptyProteinSeqViewer />
  }

  const containerRef = useRef<HTMLDivElement | any>(null);
  const canvasRef = useRef<HTMLCanvasElement | any>(null);
  const pdbDownloadUrl = `${PDB_BASE_URL}/${proteinPDBID}.${FILE_FORMAT}`;

  const initView = async () => {
    const { DefaultPluginSpec } = await import("molstar/lib/mol-plugin/spec");
    const { PluginContext } = await import("molstar/lib/mol-plugin/context");
    const { PluginConfig } = await import("molstar/lib/mol-plugin/config");
    const { PluginCommands } = await import("molstar/lib/mol-plugin/commands");
    const { ColorNames } = await import("molstar/lib/mol-util/color/names");

    try {
      const MySpec: PluginSpec = {
        ...DefaultPluginSpec(),
        config: [
          [PluginConfig.VolumeStreaming.Enabled, false]
        ],
      }

      const plugin = new PluginContext(MySpec);
      await plugin.init();

      const canvas = canvasRef.current;
      const parent = containerRef.current;
      if (!plugin.initViewer(canvas, parent)) {
        return;
      }

      const data = await plugin.builders.data.download({ url: pdbDownloadUrl }, { state: { isGhost: true } });
      const trajectory = await plugin.builders.structure.parseTrajectory(data, FILE_FORMAT);
      await plugin.builders.structure.hierarchy.applyPreset(trajectory, 'default');
      const renderer = plugin.canvas3d!.props.renderer;
      PluginCommands.Canvas3D.SetSettings(plugin, { settings: { renderer: { ...renderer, backgroundColor: ColorNames.skyblue } } });
    } catch (error: any) {
      handleOnError("Unable to render protein molecule");
    }
  }

  const parseSequence = async () => {
    if (proteinAminoAcidSequence) {
      const parsedSeq = await seqparse(proteinAminoAcidSequence)
      setSeq(parsedSeq);
    }
  }

  useEffect(() => {
    initView();
    parseSequence();
  }, []);

  return (
    <Fragment>
      <div ref={containerRef} style={containerStyle}>
        <canvas ref={canvasRef} style={{ borderRadius: "16px" }}></canvas>
      </div>

      <SeqViz
        seq={seq?.seq}
        annotations={seqVizAnnotation}
        style={SeqVizStyle}
        viewer="linear"
      />
    </Fragment>
  )
}

export default ProteinSequenceViewer;
