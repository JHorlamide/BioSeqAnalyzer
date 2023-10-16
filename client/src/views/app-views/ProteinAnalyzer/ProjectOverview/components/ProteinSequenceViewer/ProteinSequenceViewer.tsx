/* React */
import { Fragment, useEffect, useRef } from 'react';

/* Chakra UI */
import { Link, Stack } from '@chakra-ui/react';

/* Libraries */
import { FiExternalLink } from "react-icons/fi";
import { FaMapMarkedAlt } from "react-icons/fa";
import { PluginSpec } from "molstar/lib/mol-plugin/spec";
import { useParams } from "react-router-dom";

/* Application Modules */
import { APP_PREFIX_PATH, FILE_FORMAT, PDB_BASE_URL } from '../../../../../../config/AppConfig';
import useErrorToast from '../../../../../../hooks/useErrorToast';
import Button from '../../../../../../components/CustomBtn/Button';
import SequenceViewer from '../../../../../../components/SequenceViewer/SequenceViewer';
import useNavigation from '../../../../../../hooks/useNavigation';
import { useAppSelector } from '../../../../../../store/store';
import useParseSeq from '../../../../../../hooks/useParseSeq';

interface Props {
  containerStyle: object;
  pdbFileUrl?: string;
  proteinPDBID?: string;
  proteinAminoAcidSequence: string | undefined;
}

const ProteinSequenceViewer = (props: Props) => {
  const { proteinPDBID, containerStyle, pdbFileUrl, proteinAminoAcidSequence } = props
  const { handleNavigate } = useNavigation()
  const { handleError } = useErrorToast();
  const { projectId } = useParams();
  const tabIndex = Number(localStorage.getItem("tabIndex"));
  const { seqVizData, loading } = useParseSeq(proteinAminoAcidSequence)

  if (!proteinPDBID) {
    handleError("No Protein PDB ID Provided. To view protein structure please provide a PDB ID")
  }

  const containerRef = useRef<HTMLDivElement | any>(null);
  const canvasRef = useRef<HTMLCanvasElement | any>(null);
  const pdbDownloadUrl = `${PDB_BASE_URL}/${proteinPDBID}.${FILE_FORMAT}`;

  const navigate = () => {
    handleNavigate(`${APP_PREFIX_PATH}/protein-project/overview/${projectId}/sequence-map`)
  }

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

      PluginCommands.Canvas3D.SetSettings(plugin, {
        settings: {
          renderer: { ...renderer, backgroundColor: ColorNames.skyblue }
        }
      });
    } catch (error: any) {
      handleError("Unable to render protein molecule");
    }
  }

  useEffect(() => {
    initView();
  }, []);

  return (
    <Fragment>
      <Stack display="flex" alignItems="center" marginBottom={1.5} direction="row">
        {pdbFileUrl && (
          <Link
            isExternal
            href={pdbFileUrl}
            fontSize={["0.875rem", "1rem"]}
            whiteSpace="nowrap"
            {...linkStyle}
            _hover={{ fontStyle: "none" }}
          >
            View protein structure on RCSB <FiExternalLink style={iconStyle} />
          </Link>
        )}

        {tabIndex !== 1 && (
          <Button
            borderRadius={5}
            color="white"
            bgColor="brand_blue.100"
            fontSize={["0.875rem", "1rem"]}
            _hover={{ bgColor: "brand_blue.100" }}
            onClick={navigate}
          >
            View full sequence map <FaMapMarkedAlt style={iconStyle} />
          </Button>
        )}
      </Stack>

      {tabIndex !== 1 && (
        <SequenceViewer
          {...seqVizData}
          style={seqVizStyle}
          viewer={"linear"}
        />
      )}

      {proteinPDBID && (
        <div ref={containerRef} style={containerStyle}>
          <canvas ref={canvasRef} style={{ borderRadius: "16px" }}></canvas>
        </div>
      )}
    </Fragment>
  )
}

const seqVizStyle = {
  height: "18vw",
  width: "101.5%",
  padding: "10px 0",
  backgroundColor: "white",
  borderRadius: 10,
}

const linkStyle = {
  display: "flex",
  bg: "brand_blue.100",
  borderRadius: 5,
  color: "white",
  paddingX: 3,
  paddingY: 1.5,
};

const iconStyle = {
  marginLeft: 5,
  marginTop: 2.5,
};

export default ProteinSequenceViewer;
