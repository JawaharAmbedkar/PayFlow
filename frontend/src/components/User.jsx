
import { Button } from './Button';
import { useNavigate } from 'react-router-dom';

const User = ({ user }) => {
    const navigate = useNavigate();
  return (
    <div className='flex justify-between items-center'>
        <div className='flex items-center'>
            <div className='bg-slate-500 rounded-full w-8 h-8 flex justify-center items-center text-2xl text-white m-2'>
                {user.firstName[0].toUpperCase()}
            </div>
            <h2 className="font-medium text-lg">{user.firstName} {user.lastName}</h2>
        </div>
      <div className='justify-center items-centers m-2'>
        <Button onClick={(e)=>{
            navigate("/sendMoney?id=" + user._id +"&name="+ user.firstName);
        }} label={"send Money"}/></div>
    </div>
  );
};

export default User;