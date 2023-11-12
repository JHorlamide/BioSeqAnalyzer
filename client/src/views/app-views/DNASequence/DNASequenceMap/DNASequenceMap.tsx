/* Libraries */
import { useParams } from 'react-router-dom';

/* Application Modules */
import { useGetProjectQuery } from '../../../../services/DNASequence/DNASeqProjectAPI'
import SequenceMap from '../../../../components/SequenceMap/SequenceMap';
import useParseSeq from "../../../../hooks/useParseSeq";
import Utils from '../../../../utils';

const seqVizStyle = {
  marginTop: -6,
  borderRadius: 10,
  height: "43vw",
  width: "101.5%",
  padding: "10px 0",
  backgroundColor: "white",
  searchInputWidth: "520px"
}

const DNASequenceMap = () => {
  const { projectId } = useParams();
  const { data, isLoading } = useGetProjectQuery({ projectId: String(projectId) });
  const { bases, file_content, sequence, name, nucleotide_type, topology, date_of_submission } = data?.data || {};
  const { seqVizData, loading: seqVizLoading } = useParseSeq(file_content || sequence || null);

  const sequenceData = bases !== null ?
    { ...seqVizData, style: seqVizStyle, seq: bases } :
    { ...seqVizData, style: seqVizStyle }

  const info = {
    name,
    nucleotide_type: nucleotide_type === "D" ? "DNA" : "RNA",
    topology: topology === "L" ? "Linear" : "Circular",
    created: Utils.formattedDate(date_of_submission)
  }

  return <SequenceMap
    info={info}
    isLoading={isLoading || seqVizLoading}
    sequenceData={sequenceData}
  />
}

export default DNASequenceMap;