const Form = () => {
  return (
    <div className='mx-auto mt-10 max-w-4xl border px-4 py-3'>
      <h1 className='text-2xl font-bold'>Form</h1>
      <p className='text-gray-500'>This is a form page.</p>
      <form className='mt-4'>
        <label htmlFor="name" className='block text-sm font-medium text-gray-700'>Name</label>
        <input type="text" id="name" name="name" className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500' />
        <button type="submit" className='mt-4 bg-blue-500 text-white px-4 py-2 rounded-md'>Submit</button>
      </form>
    </div>
  )
}

export default Form;