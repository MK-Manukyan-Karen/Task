import { TaskForm } from '../TaskForm/TaskForm'
import { MySelect } from '../ReactSelect/MySelect'
import { MyCalendar } from '../Calendar/Calendar'
import style from './CreateTaskForm.module.css'
import { ModalCalendar } from '../ModalCalendar/ModalCalendar'
import { AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import calendarIcon from '../../../assets/icons/calendar-icon.png'
import { dateFormatter } from '../../../helpers/helpers'



export const CreateTaskForm = ({ setIsShowCreateTasksModalForm, createNewTask }) => {

    const [isShowStartCalendar, setIsShowStartCalendar] = useState(false)
    const [isShowEndCalendar, setIsShowEndCalendar] = useState(false)
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [employeeId, setImployeID] = useState('')

    const onSubmit = (data, reset) => {
        createNewTask({
            ...data,
            startDate,
            endDate,
            employeeId
        })
        setIsShowCreateTasksModalForm(false)
        reset()

    }

    const setNewStartDate = (date) => {
        setStartDate(dateFormatter(date))
    }

    const setNewEndDate = (date) => {
        setEndDate(dateFormatter(date))
    }

    return (

        <div className={style.container}>
            <div className={style.paragraphWrapper}>
                <p className={style.paragraph}>Create New Task</p>
            </div>
            <AnimatePresence>
                {isShowStartCalendar &&
                    <ModalCalendar setIsShow={setIsShowStartCalendar} zIndex={2}>
                        <MyCalendar setIsShowCalendar={setIsShowStartCalendar} setNewDate={setNewStartDate} />
                    </ModalCalendar>
                }
                {isShowEndCalendar &&
                    <ModalCalendar setIsShow={setIsShowEndCalendar} zIndex={2}>
                        <MyCalendar setIsShowCalendar={setIsShowEndCalendar} setNewDate={setNewEndDate} />
                    </ModalCalendar>
                }
            </AnimatePresence>
            <MySelect setImployeID={setImployeID} />
            <div className={style.calendarWrapper}>
                <div className={style.starDateCalendar}>
                    <p className={style.startDate}>Start Date</p>
                    <img src={calendarIcon}
                        className={style.calendar}
                        alt='calendarStart'
                        onClick={() => setIsShowStartCalendar(true)}
                    />
                    <p className={style.startDateText}>{startDate}</p>
                </div>
                <div className={style.endDateCalendar}>
                    <p className={style.endDate}>End Date</p>
                    <img src={calendarIcon}
                        className={style.calendar}
                        alt='calendarEnd'
                        onClick={() => setIsShowEndCalendar(true)}
                    />
                    <p className={style.endDateText}>{endDate}</p>
                </div>
            </div>
            <TaskForm onSubmit={onSubmit} />

        </div>
    )

}

