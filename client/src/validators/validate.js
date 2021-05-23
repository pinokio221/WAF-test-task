import { api } from '../api/api'


export const validate = values => {
    const errors = {}
    const requiredFields = [
      'title',
      'category',
      'year',
      'genre',
      'rating',
      'image',
      'link'
    ]
    requiredFields.forEach(field => {
      if (!values[field]) {
        errors[field] = 'Required'
      }
    })

    return errors
  }

export const asyncValidate = async (values) => {
  console.log(values)
  if(values.title && values.category) {
    const response = await api.titleValidation(values.title, values.category, values.id)
    if (response.status === 302) {
      throw { title: response.data.message }
    }
  }
  
}