import PreviousActivitiesCard from '@/components/PreviousActivities';
import PersonalDataCard from './../../components/PersonalDataCard';
import BensDireitosCard from './../../components/BensEDireitosCard';

const Form = () => {
  return (
    <div className='mx-auto mt-10 px-4'>
      <PersonalDataCard />
      <PreviousActivitiesCard />
      <BensDireitosCard />
    </div>
  )
}
export default Form;