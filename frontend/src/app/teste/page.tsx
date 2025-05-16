import PreviousActivitiesCard from '@/components/cardsForm/PreviousActivities';
import PersonalDataCard from './../../components/cardsForm/PersonalDataCard';
import BensDireitosCard from '../../components/cardsForm/BensEDireitosCard';
import ConflictCard from './../../components/cardsForm/ConflictCard';
import OptionalAttachment from '../../components/cardsForm/OptionalAttachment';

const Form = () => {
  return (
    <div className='mx-auto mt-10 px-4'>
      <PersonalDataCard />
      <PreviousActivitiesCard />
      <BensDireitosCard />
      <ConflictCard />
      <OptionalAttachment />
    </div>
  )
}
export default Form;