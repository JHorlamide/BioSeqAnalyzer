import { useState, useEffect, useMemo } from "react";

import seqparse, { Seq } from "seqparse";

import useErrorToast from "./useErrorToast";

const useParseSeq = (sequenceId: string | undefined | null) => {
  const { handleError } = useErrorToast();
  const [loading, setLoading] = useState(false);
  const [seqVizData, setSeqvizData] = useState<Seq>({
    annotations: [],
    seq: "",
    name: "",
    type: "unknown",
  });

  const parseSequence = async () => {
    if (sequenceId !== null && sequenceId !== undefined) {
      return await seqparse(sequenceId);
    }

    return null;
  };

  const parsedSeq = useMemo(parseSequence, [sequenceId]);

  const parseSequenceAndUpdateSeqViewState = async () => {
    setLoading(true);

    try {
      const seqData = await parsedSeq;

      if (seqData === null || seqData === undefined) {
        setLoading(false);
        return seqVizData;
      }

      if (seqData && seqData.annotations.length > 0) {
        const updateSeqVizData = {
          ...seqVizData,
          ...seqData,
          annotations: seqData.annotations
        }

        setSeqvizData(updateSeqVizData);
        setLoading(false);
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

export default useParseSeq;


// const annotations = [{
//   name: String(seqData?.name),
//   start: 0,
//   end: Number(seqData?.seq.length),
//   direction: 1,
//   color: "#08355a"
// }]

// const updatedSeqVizData = {
//   ...seqVizData,
//   ...seqData,
//   annotations
// }

// setSeqvizData(updatedSeqVizData);
// setLoading(false);