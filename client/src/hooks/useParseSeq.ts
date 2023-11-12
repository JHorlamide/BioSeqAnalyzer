import { useState, useEffect, useMemo } from "react";

/* Libraries */
import seqparse, { Seq } from "seqparse";

/* Application Modules */
import useErrorToast from "./useErrorToast";

const useParseSeq = (sequence: string | undefined | null) => {
  const { handleError } = useErrorToast();
  const [loading, setLoading] = useState(false);
  const [seqVizData, setSeqvizData] = useState<Seq>({
    annotations: [],
    seq: "",
    name: "",
    type: "unknown",
  });

  const parseSequence = async () => {
    if (sequence !== null && sequence !== undefined) {
      return await seqparse(sequence);
    }

    return null;
  };

  const parsedSeq = useMemo(parseSequence, [sequence]);

  const parseSequenceAndUpdateSeqViewState = async () => {
    setLoading(true);

    try {
      const seqData = await parsedSeq;

      if (seqData === null || seqData === undefined) {
        setLoading(false);
        return seqVizData
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
        start: 0,
        direction: 1,
        color: "#08355a",
        name: String(seqData?.name),
        end: Number(seqData?.seq.length),
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
  }, [sequence]);

  return { seqVizData, loading };
}

export default useParseSeq;
