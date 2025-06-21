import React from 'react';
import { Input, Segmented, Table } from 'antd';
import { CheckCircleFilled, CloseCircleFilled, CloseCircleOutlined, CloseOutlined } from '@ant-design/icons';
import "./StudentTable.css";
import TextArea from 'antd/es/input/TextArea';


const StudentsTable = ({data, setAttendance, isLoading}) => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: "35%",
      render: (text,studentData) => {
  
        return <div className={`${studentData?.status}`}><b>{text}</b></div>
      }
    },
  
    {
      title: 'Status',
      key: 'status',
      render: (status, record) => (
        <>
        <Segmented value={status} width={"100%"}
        onChange={(value) => {
          setAttendance((prev) => {
            return prev.map((item) => {
              if (item.key === record?.key) {
                return {...item, status: value};
              }
              return item;
            });
          });
        }}
          options={[
            { value: 'present', icon: <CheckCircleFilled style={{color: 'green'}}/> },
            { value: 'late', icon: <CheckCircleFilled style={{color: 'red'}} /> },
            { value: 'leave', icon: <CloseCircleFilled style={{color: 'orange'}} /> },
            { value: 'absent', icon: <CloseCircleOutlined style={{color: 'crimson'}}/> },
          ]}
        />
        <p/>
        <TextArea placeholder='Remarks' value={record?.remarks} />
        </>
          // <Switch checkedChildren="Present" unCheckedChildren="Absent" defaultChecked />
      ),
    },
  ];

  return <Table 
    className='students-table'
    columns={columns} 
    loading={isLoading}
    dataSource={data} 
    scroll={{y: 'calc(100vh - 180px)'}}
    rowClassName={'students-table-row'}
    rowSelection={{type: "checkbox"}} 
    pagination={false}
  />;
}
export default StudentsTable;