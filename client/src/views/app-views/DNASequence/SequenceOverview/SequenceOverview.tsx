/* Libraries */
import { useParams } from 'react-router-dom';

/* Application Modules */
import { useGetProjectQuery } from '../../../../services/DNASequence/DNASeqProjectAPI'
import SequenceMap from '../../../../components/SequenceMap/SequenceMap';
import useParseSeq from "../../../../hooks/useParseSeq";
import AppLoader from '../../../../components/Loading/AppLoader';
import { Fragment } from 'react';

const SequenceOverview = () => {
  const { projectId } = useParams();
  const { data, isLoading } = useGetProjectQuery({ projectId: String(projectId) });
  const { seqVizData, loading } = useParseSeq(data?.bases);

  const sequenceData = {
    ...seqVizData,
    style: {
      height: "43vw",
      width: "101.5%",
      padding: "10px 0",
      backgroundColor: "white",
      borderRadius: 10,
    },
  }

  return (
    <Fragment>
      {loading ? (
        <AppLoader />
      ) : (
        <SequenceMap sequenceData={sequenceData} />
      )}
    </Fragment>
  )
}

export default SequenceOverview;