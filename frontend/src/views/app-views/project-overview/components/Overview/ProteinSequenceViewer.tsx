import { useEffect, useRef } from 'react';
import { toast } from 'react-hot-toast';
import { PluginSpec } from 'molstar/lib/mol-plugin/spec';
import { FILE_FORMAT, PDB_BASE_URL } from '../../../../../config/AppConfig';

interface containerStyle {
  width: string;
  height: string;
  marginTop?: string;
  display: string;
  justifyContent: string;
}

interface Props {
  proteinPDBID?: string;
  containerStyle: containerStyle;
}

const ProteinSequenceViewer = ({ proteinPDBID, containerStyle }: Props) => {
  const containerRef = useRef<HTMLDivElement | any>(null);
  const canvasRef = useRef<HTMLCanvasElement | any>(null);
  const pdbDownloadUrl = `${PDB_BASE_URL}/${proteinPDBID}.${FILE_FORMAT}`;

  const initView = async () => {
    const { DefaultPluginSpec } = await import("molstar/lib/mol-plugin/spec");
    const { PluginContext } = await import("molstar/lib/mol-plugin/context");
    const { PluginConfig } = await import("molstar/lib/mol-plugin/config");
    const { PluginCommands } = await import("molstar/lib/mol-plugin/commands");
    const { ColorNames } = await import("molstar/lib/mol-util/color/names");


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
      toast.error("Failed to init Mol*");
      return;
    }

    const data = await plugin.builders.data.download({ url: pdbDownloadUrl },{ state: { isGhost: true } });
    const trajectory = await plugin.builders.structure.parseTrajectory(data, FILE_FORMAT);
    await plugin.builders.structure.hierarchy.applyPreset(trajectory, 'default');
    const renderer = plugin.canvas3d!.props.renderer;
    PluginCommands.Canvas3D.SetSettings(plugin, { settings: { renderer: { ...renderer, backgroundColor: ColorNames.skyblue } } });
  }

  useEffect(() => {
    initView();
  }, []);

  return (
    <div ref={containerRef} style={containerStyle}>
      <canvas ref={canvasRef} style={{ borderRadius: "20px" }}></canvas>
    </div>
  )
}

export default ProteinSequenceViewer

