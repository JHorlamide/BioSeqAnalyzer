import { SeqViz, SeqVizProps } from "seqviz";

interface Props extends SeqVizProps { };

const SequenceViewer = (props: Props) => {
  const { seq, annotations, style, viewer, ...rest } = props;

  return (
    <SeqViz
      seq={seq}
      annotations={annotations}
      style={style}
      viewer={viewer}
      {...rest}
    />
  )
}

export default SequenceViewer