import { Link } from 'react-router-dom';

const Sidebar = () => (
  <div className='bg-blue-800 text-white w-64 h-screen p-4'>
    <h2 className='text-2xl font-bold mb-6'>Hostel Management</h2>
    <ul>
      <li className='mb-4'>
        <Link to='/dashboard' className='hover:text-blue-300'>Dashboard</Link>
      </li>
      <li className='mb-4'>
        <Link to='/application-form' className='hover:text-blue-300'>Application Form</Link>
      </li>
      <li className='mb-4'>
        <Link to='/notifications' className='hover:text-blue-300'>Notifications</Link>
      </li>
      <li className='mb-4'>
        <Link to='/contact' className='hover:text-blue-300'>Contact</Link>
      </li>
    </ul>
  </div>
);

export default Sidebar;
