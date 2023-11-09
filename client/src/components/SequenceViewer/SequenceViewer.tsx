import { SeqViz, SeqVizProps } from "seqviz";

interface Props extends SeqVizProps { };

const SequenceViewer = (props: Props) => {
  const { seq, annotations, style, viewer, ...rest } = props;

  const translations = [
    { direction: -1, end: 630, start: 6 },
    { end: 1147, start: 736 },
    { end: 1885, start: 1165 },
  ];

  return (
    <SeqViz
      seq={seq}
      style={style}
      viewer={viewer}
      annotations={annotations}
      translations={translations}
      {...rest}
    />
  )
}

export default SequenceViewer