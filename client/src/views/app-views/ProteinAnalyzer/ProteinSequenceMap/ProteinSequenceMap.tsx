/* Application Modules */
import SequenceMap from '../../../../components/SequenceMap/SequenceMap';
import useParseSeq from '../../../../hooks/useParseSeq';
import { useParams } from 'react-router-dom';
import { useGetProjectQuery } from '../../../../services/proteinProject/proteinProjectAPI';

const seqVizStyle = {
  marginTop: -6,
  borderRadius: 10,
  height: "43vw",
  width: "101.5%",
  padding: "10px 0",
  backgroundColor: "white",
  searchInputWidth: "520px"
}

const ProteinSequenceMap = () => {
  const { projectId } = useParams();
  const { data: project, isLoading, refetch } = useGetProjectQuery({ projectId: String(projectId) });
  const { proteinAminoAcidSequence } = project?.data || {};
  const { seqVizData, loading: seqVizLoading } = useParseSeq(proteinAminoAcidSequence);

  return <SequenceMap
    refetch={refetch}
    isLoading={isLoading || seqVizLoading}
    sequenceData={{ ...seqVizData, style: seqVizStyle }}
  />
}

export default ProteinSequenceMap;
