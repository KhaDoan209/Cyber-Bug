import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Tag, Space, Button, Modal, Select } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { getProjectDetailAction, updateTaskAction } from '../../redux/action/projectAction';
import parse from 'html-react-parser';
import { getAllStatusAction } from '../../redux/action/statusAction';
import { getAllPriorityAction } from '../../redux/action/priorityAction';
import { getTaskDetailAction } from '../../redux/action/projectAction';
import { add_member_task, delete_member_task, update_description_task, update_detail_task } from '../../redux/reducer/taskModalReducer';
import { Editor } from '@tinymce/tinymce-react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';


const ProjectDetail = (props) => {
    const { projectDetail } = useSelector(state => state.projectReducer)
    const { taskDetailModal } = useSelector(state => state.taskModalReducer)
    const { listStatus } = useSelector(state => state.statusReducer);

    const { listPriority } = useSelector(state => state.priorityReducer);
    const [visible, setvisible] = useState(false)
    const [content, setcontent] = useState(taskDetailModal.description)


    const listUserAsign = taskDetailModal.assigness.map((mem, index) => {
        return mem.id
    })
    const taskDetailModal1 = { ...taskDetailModal, listUserAsign: listUserAsign }
    console.log("1", taskDetailModal1)



    const handleOnChange = (e) => {

        let { name, value } = e.target
        let taskDetailModal2 = { ...taskDetailModal }
        taskDetailModal2[name] = value
        dispatch(update_detail_task(taskDetailModal2))

    }
    const handleDragEnd = (result) => {
        let { projectId, taskId } = JSON.parse(result.droppableId)
        console.log(projectId, taskId)
        console.log(result)

    }
    console.log("huy", taskDetailModal)
    // console.log({ projectDetail })
    const dispatch = useDispatch();

    let memberlist = []; // luu member_id cua mang arr select
    const [open, setOpen] = useState(false);
    const color = ["magenta", "purple", "cyan", "green"]

    const ColumTask = () => {
        return <DragDropContext onDragEnd={handleDragEnd}>
            {
                projectDetail.lstTask?.map((colum, index) => {
                    return <Droppable key={index} droppableId={colum.statusId}>
                        {(provided) => {
                            return <Col ref={provided.innerRef} {...provided.droppableProps} key={index} span={6}>
                                <Card title={<Tag color={`${color[index]}`}>{colum.statusName}</Tag>} bordered={true} style={{ backgroundColor: '#F5F5F5' }}>
                                    {colum.lstTaskDeTail.length > 0 ? (colum.lstTaskDeTail.map((task, index) => {
                                        return <Draggable draggableId={task.taskId.toString()} key={task.taskId.toString()} index={index}>
                                            {(provided) => {
                                                return <div ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}>
                                                    <Card

                                                        className='mb-2 text-center' onClick={() => {
                                                            setOpen(true)
                                                            console.log("task", task.taskId)
                                                            dispatch(getTaskDetailAction(task.taskId))
                                                        }} key={index} title={task.taskName} bordered={true} style={{ backgroundColor: '#FFFFFF' }}>
                                                        <Space size={[0, 8]} wrap >
                                                            {task.taskTypeDetail.id === 1 ? <Tag color="#f50">{task.taskTypeDetail.taskType}</Tag> : <Tag color="#108ee9">{task.taskTypeDetail.taskType}</Tag>}
                                                            <Tag color="#2db7f5">{task.priorityTask.priority}</Tag>
                                                        </Space>
                                                    </Card>
                                                </div>
                                            }}
                                        </Draggable>
                                    })) : ''}


                                </Card>
                                {provided.placeholder}
                            </Col>
                        }}
                    </Droppable>
                })}
        </DragDropContext>
    }


    const renderTaskDescription = () => {
        // const jsxDescription = parse(taskDetailModal.description);
        return <div>
            {visible ? <div>
                <Editor
                    name='description'
                    initialValue={taskDetailModal.description}
                    init={{
                        height: 500,
                        menubar: false,
                        plugins: [
                            'advlist autolink lists link image charmap print preview anchor',
                            'searchreplace visualblocks code fullscreen',
                            'insertdatetime media table paste code help wordcount'
                        ],
                        toolbar: 'undo redo | formatselect | ' +
                            'bold italic backcolor | alignleft aligncenter ' +
                            'alignright alignjustify | bullist numlist outdent indent | ' +
                            'removeformat | help',
                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                    }}
                    onEditorChange={(content, eidtor) => {
                        setcontent(content)
                    }}
                />
                <button className="btn btn-danger"
                    onClick={() => {
                        let name = "description"
                        let value = content
                        setvisible(!visible)
                        let taskDetailModal2 = { ...taskDetailModal }
                        taskDetailModal2[name] = value
                        dispatch(update_detail_task(taskDetailModal2))
                    }}

                >Save</button>
            </div> : <div onClick={() => {
                setvisible(!visible)
            }}
            >{taskDetailModal.description}</div>}
        </div>

    }

    const tagRender = (props) => {
        const { label, value, closable, onClose, onSelect } = props;
        const onPreventMouseDown = (event) => {
        };
        return (
            <Tag
                color={'green'}
                onMouseDown={onPreventMouseDown}
                closable={closable}
                onClose={onClose}

                style={{
                    marginRight: 3,
                }}
            >
                {label}
            </Tag>
        );
    };


    useEffect(() => {
        const { projectId } = props.match.params;
        dispatch(getProjectDetailAction(projectId));
        dispatch(getAllStatusAction())
        dispatch(getAllPriorityAction())


    }, [])

    return (
        <div>
            <h1 className='mb-5'>Project Detail</h1>
            <Row gutter={16} >
                {ColumTask()}
            </Row>
            <Modal
                title="Modal 1000px width"
                open={open}
                onOk={() => {
                    setOpen(false)
                    dispatch(updateTaskAction(taskDetailModal1))

                }}

                onCancel={() => setOpen(false)}
                width={1000}
            >
                <Row>
                    <Col span={16}>
                        <Row>
                            <Col span={24}>
                                <h5>Discription</h5>
                                {renderTaskDescription()}
                            </Col>
                        </Row>
                    </Col>

                    <Col span={24}>

                        <div className="form-group">
                            <h5>Status</h5>
                            <select name='statusId' className='form-control' value={taskDetailModal.statusId} onChange={(e) => {
                                handleOnChange(e)
                            }}>
                                {listStatus.map((status, index) => {
                                    return <option key={index} value={status.statusId}>
                                        {status.statusName}
                                    </option>
                                })}
                            </select>
                        </div>
                        <div className="form-group">
                            <h5>Priority</h5>
                            <select name='priorityId' className='form-control' value={taskDetailModal.priorityId} onChange={(e) => {
                                handleOnChange(e)
                            }} >
                                {listPriority.map((status, index) => {
                                    return <option key={index} value={status.priorityId}>
                                        {status.priority}
                                    </option>
                                })}
                            </select>
                        </div>
                        <div className="form-group">
                            <h5>Assign</h5>
                            <div className='row' style={{ display: "flex" }}>
                                {taskDetailModal.assigness.map((mem, index) => {
                                    return <div className="col-6 mt-2 mb-2 text-center" style={{ display: "flex" }} key={index}>
                                        <div>
                                            <img style={{ width: "100%", borderRadius: "50%" }} src={mem.avatar} alt={mem.avatar} />
                                            <p className='mt-1 ml-1'>{mem.name}

                                            </p>
                                        </div>
                                        <div>

                                            < h3 style={{ cursor: "pointer" }} onClick={() => {
                                                dispatch(delete_member_task(mem.id))
                                            }}>x</h3>

                                        </div>

                                    </div>

                                })}
                            </div>
                        </div>

                    </Col>

                    <Col className='mt-3' span={24}>
                        <p className=''>Add More</p>
                        <select className='form-control' name="lstUser" id="" onChange={(e) => {
                            const value = e.target.value
                            if (value == 0) {
                                return;
                            }
                            let userSelect = projectDetail.members?.find(mem => mem.userId == value)
                            userSelect = { ...userSelect, id: userSelect.userId }
                            dispatch(add_member_task(userSelect))
                        }}>
                            <option value="0">Select Assign</option>
                            {projectDetail.members?.filter(mem => {
                                let index = taskDetailModal.assigness?.findIndex(us => us.id == mem.userId)
                                if (index !== -1) {
                                    return false
                                }
                                return true
                            }).map((member, index) => {
                                return <option value={member.userId}>{member.name}
                                </option>

                            })}
                        </select>

                    </Col>
                </Row>
            </Modal >
        </div >
    )
}

export default ProjectDetail;
