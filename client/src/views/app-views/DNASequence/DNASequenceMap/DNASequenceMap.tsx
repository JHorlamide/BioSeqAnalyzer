/* Libraries */
import { useParams } from 'react-router-dom';

/* Application Modules */
import { useGetProjectQuery } from '../../../../services/DNASequence/DNASeqProjectAPI'
import SequenceMap from '../../../../components/SequenceMap/SequenceMap';
import useParseSeq from "../../../../hooks/useParseSeq";

const seqVizStyle = {
  height: "43vw",
  width: "101.5%",
  padding: "10px 0",
  borderRadius: 10,
  backgroundColor: "white",
}

const DNASequenceMap = () => {
  const { projectId } = useParams();
  const { data, isLoading, refetch } = useGetProjectQuery({ projectId: String(projectId) });
  const { bases, file_content, sequence } = data?.data || {};
  const { seqVizData, loading: seqVizLoading } = useParseSeq(file_content || sequence || null);
  const sequenceData = bases !== null ?
    { ...seqVizData, seq: bases, style: seqVizStyle } :
    { ...seqVizData, style: seqVizStyle }

  return <SequenceMap
    refetch={refetch}
    isLoading={isLoading || seqVizLoading}
    sequenceData={sequenceData}
  />
}

export default DNASequenceMap;