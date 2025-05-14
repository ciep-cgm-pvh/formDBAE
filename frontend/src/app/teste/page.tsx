import PreviousActivitiesCard from '@/components/PreviousActivities';
import PersonalDataCard from './../../components/PersonalDataCard';

const Form = () => {
  return (
    <div className='mx-auto mt-10 max-w-4xl border px-4 py-3'>
      <PersonalDataCard/>
      <PreviousActivitiesCard/>
    </div>
  )
}
export default Form;