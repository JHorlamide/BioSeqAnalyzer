/* Application Modules */
import SequenceMap from '../../../../components/SequenceMap/SequenceMap';
import useParseSeq from '../../../../hooks/useParseSeq';
import { useParams } from 'react-router-dom';
import { useGetProjectQuery } from '../../../../services/proteinProject/proteinProjectAPI';

const ProteinSequenceMap = () => {
  const { projectId } = useParams();
  const { data: project } = useGetProjectQuery({
    projectId: String(projectId)
  });

  const { proteinAminoAcidSequence } = project?.data || {};
  const { seqVizData, loading } = useParseSeq(proteinAminoAcidSequence);

  const seqVizStyle = {
    height: "43vw",
    width: "101.5%",
    padding: "10px 0",
    backgroundColor: "white",
    borderRadius: 10,
  }

  return <SequenceMap
    sequenceData={{ ...seqVizData, style: seqVizStyle }}
    isLoading={loading}
  />
}

export default ProteinSequenceMap;
