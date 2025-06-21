import { Card, Layout, message, Space, Spin } from 'antd'
import { useUserContext } from '../../UserContext'
import {LoadingOutlined, LogoutOutlined, UserOutlined} from '@ant-design/icons';
import {useNavigate} from 'react-router';
import "./home.css";
import axios from 'axios';
import { CustomLayout } from '../Layout/CustomLayout';
import { useEffect, useState } from 'react';
import { ClassCard } from '../class-card/ClassCard';
import { API_URLS } from '../../constants';
import { getFormattedDate, pendingTasksSerializer } from '../../helpers';

export const Home = ({
  setClassAttendanceDetails,
}) => {
  const date = new Date();
  
  const formattedDate = getFormattedDate(date);
  const navigate = useNavigate();
  const userContext = useUserContext();

  const [classes, setClasses] = useState([]);
  const [pendingTasks, setPendingTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    axios.get(API_URLS.GET_PENDING_ATTENDANCE_TASKS, {
      params: {
        userId: localStorage.getItem('id'),
      }
    }).then((response) => {
      if (response?.status === 200) {
        setPendingTasks(pendingTasksSerializer(response?.data?.data || []));
      } else {
        message.error('Failed to fetch attendance status');
      }
      setIsLoading(false);
    }).catch(error => {
      setIsLoading(false);
      console.error('Error fetching attendance status:', error);
      message.error('An error occurred while fetching classes. Please try again.');
    });
  }, []);
  

  const onClickMarkAttendance = (id, date, classId) => {
    setClassAttendanceDetails({
      classAttendanceId: id,
      date,
      classId,
    });
    navigate('/attendance-page');
  }
  
  return <>
  <CustomLayout hasHeader={true} hasFooter={false} title='Home' hasLogout={true} headerClassName='home-header-container' layoutClassName='home-container'>
  <div className='welcome-container'>
        <div className='profile-icon'>
          <UserOutlined style={{fontSize: 40}}/>
        </div>
        <div className='greeting'>
        <span className='date'>{formattedDate}</span>
        <h1>Assalamualaikum, {localStorage.getItem("name")}!</h1>
        </div>
      </div>
      {isLoading ? <div className='loading-container'>
        <Spin className='loading-spinner' tip="Loading classes..."/>
      </div> :
        <Space direction="vertical" size={16} className='classlist-container' style={{width: "100%"}}>
        {pendingTasks?.length > 0 ? pendingTasks?.map((task, index) => (
          <ClassCard
            key={task?.id}
            index={index}
            classId={task?.classId}
            className={task?.className}
            date={getFormattedDate(new Date(task?.date))}
            onClickMarkAttendance={onClickMarkAttendance}
            classAttendanceId={task?.id}
          />
        )) : "No classes found."}
        </Space>
      }

    </CustomLayout>
    </>
}
