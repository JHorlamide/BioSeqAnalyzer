/* Libraries */
import { useParams } from 'react-router-dom';

/* Application Modules */
import { useGetProjectQuery } from '../../../../services/DNASequence/DNASeqProjectAPI'
import SequenceMap from '../../../../components/SequenceMap/SequenceMap';
import useParseSeq from "../../../../hooks/useParseSeq";

const SequenceOverview = () => {
  const { projectId } = useParams();
  const { data } = useGetProjectQuery({ projectId: String(projectId) });
  const { bases }  = data || {};
  const { seqVizData, loading } = useParseSeq(null);

  const seqVizStyle = {
    height: "43vw",
    width: "101.5%",
    padding: "10px 0",
    backgroundColor: "white",
    borderRadius: 10,
  }

  return <SequenceMap
    sequenceData={{ ...seqVizData, seq: bases, style: seqVizStyle }}
    isLoading={loading}
  />
}

export default SequenceOverview;