//Используем состояние React (use React)
import React, { useState } from 'react'
import Constants from '../utilities/Constants'

export default function PostCreateForm(props) {
    const initialFormData = Object.freeze({
        text: "12",
        from: "Zavod",
        whom: "Ai"
    });

    //Передаем некоторые начальные данные формы
    const [formData, setFormData] = useState(initialFormData);

    const handleChange = (e) => {
        //Установка данных формы
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        //Предотвратит выполнение действия по умолчанию при отправки формы
        e.preventDefault();

        const postToCreate = {
            postId: 0,
            text: formData.text,
            date: formData.date,
            whom: formData.whom,
            action: formData.action,
            from: formData.from
        };
        //URL
        const url = Constants.API_URL_CREATE_POST;
        const url_2 = Constants.API_URL_CREATE_POST_2;

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postToCreate)
        })
            .then(Response => Response.json())
            .then(responseFromServer => {
                console.log(responseFromServer);
            })
            .catch((error) => {
                console.log(error);

                alert(error);
            });

        fetch(url_2, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postToCreate)
        })
            .then(Response => Response.json())
            .then(responseFromServer => {
                console.log(responseFromServer);
            })
            .catch((error) => {
                console.log(error);

                alert(error);
            });

        props.onPostCreated(postToCreate);
    };

    return (
        <form className='w-100 px-5'>
            <center><h1 className='mt-5'>Создать задачу</h1></center>
            <div className='mt-5'>
                <label className='h3 form-label'> Тема </label>
                <select class="form-select" name="action"  >
                    <option value="Отопление">Отопление</option>
                    <option value="Кондиционирование">Кондиционирование</option>
                    <option value="Вентиляция">Вентиляция</option>
                    <option value="Общестроительные">Общестроительные</option>
                    <option value="Водопровод">Водопровод</option>
                    <option value="Лифты">Лифты</option>
                </select>
            </div>
            <div className='mt-5'>
                <label className='h3 form-label'> Дата </label>
                <input value={FormData.date} name="date" type="text" className='form-control' onChange={handleChange} />
            </div>
            <div className='mt-5'>
                <label className='h3 form-label'> Статус </label>
                <select class="form-select" name="action" value={formData.action} onChange={handleChange}>
                    <option value="Новая">Новая</option>
                    <option value="В ожидании">В ожидании</option>
                    <option value="В работе">В работе</option>
                </select>
            </div>
            <div className='mt-4'>
                <label className='h3 form-label'> От кого </label>
                <input value={FormData.from} name="from" type="text" className='form-control' onChange={handleChange} />
            </div>
            <div className='mt-3'>
                <label className='h3 form-label'> Кому </label>
                <select class="form-select" name="whom" value={formData.whom} onChange={handleChange}>
                    <option value="Дежурный сантехник">Дежурный сантехник</option>
                    <option value="Дежурный техник">Дежурный техник</option>
                    <option value="Дежурный диспетчер">Дежурный диспетчер</option>
                    <option value="Механик по ремонту технологического оборудования">Механик по ремонту технологического оборудования</option>
                    <option value="В работе">Алехин Милан</option>
                </select>
            </div>
            <div className='mt-2'>
                <label className='h3 form-label'>Описание</label>
                <input value={FormData.text} name="text" type="text" className='form-control' onChange={handleChange} />
            </div>

            <button onClick={handleSubmit} className="btn btn-dark btn-lg w-100 mt-5">Создать</button>
            <button onClick={() => props.onPostCreated(null)} className="btn btn-secondary btn-lg w-100 mt-3" >Отмена</button>
        </form>
    )
}
