import { useState, useEffect, useMemo } from "react";

import seqparse, { Seq } from "seqparse";

import useErrorToast from "./useErrorToast";

const useParseSeq = (sequenceId?: string) => {
  const { handleError } = useErrorToast();
  const [loading, setLoading] = useState(false);
  const [seqVizData, setSeqvizData] = useState<Seq>({
    annotations: [],
    seq: "",
    name: "",
    type: "unknown",
  });

  const parseSequence = async () => {
    if (sequenceId) {
      return await seqparse(sequenceId);
    }

    return null;
  };

  const parsedSeq = useMemo(parseSequence, [sequenceId]);

  const parseSequenceAndUpdateSeqViewState = async () => {
    setLoading(true);
    const seqData = await parsedSeq;

    try {
      if (seqData && seqData.annotations.length > 0) {
        const updateSeqVizData = {
          ...seqVizData,
          ...seqData,
          annotations: seqData.annotations
        }

        setSeqvizData(updateSeqVizData);
        setLoading(false);
        return;
      }

      const annotations = [{
        name: String(seqData?.name),
        start: 0,
        end: Number(seqData?.seq.length),
        direction: 1,
        color: "#08355a"
      }]

      const updatedSeqVizData = {
        ...seqVizData,
        ...seqData,
        annotations
      }

      setSeqvizData(updatedSeqVizData);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      handleError(error.message.split("url=")[0]);
    }
  };

  useEffect(() => {
    parseSequenceAndUpdateSeqViewState();
  }, []);

  return { seqVizData, loading };
}

// const parseSequenceAndUpdateSeqViewState = async () => {
//   try {
//     if (proteinAminoAcidSequence) {
//       const parsedSeq: Seq = await seqparse(proteinAminoAcidSequence);
//       let seqVizAnnotation;

//       if (parsedSeq && parsedSeq.annotations.length > 0) {
//         seqVizAnnotation = parsedSeq?.annotations;
//       } else {
//         seqVizAnnotation = [{
//           name: String(parsedSeq.name),
//           start: 0,
//           end: Number(parsedSeq.seq.length),
//           direction: 1,
//           color: "#08355a"
//         }]
//       }

//       dispatch(setSeq(parsedSeq.seq));
//       dispatch(setName(parsedSeq.name));
//       dispatch(setType(parsedSeq.type));
//       dispatch(setAnnotation(seqVizAnnotation))
//       dispatch(setViewStyle(seqViewStyle));
//     }
//   } catch (error: any) {
//     handleError(error.message.split("url=")[0])
//   }
// }

export default useParseSeq;