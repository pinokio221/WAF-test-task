export const validate = values => {
    const errors = {}
    const requiredFields = [
      'title',
      'type',
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
    if(values.firstname && (values.firstname.length < 2 || values.firstname.length > 12)) {
      errors.firstname = 'The first name cannot be less than 3 or more than 12 characters'
    }

    return errors
  }

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

export const asyncValidate = (values /*, dispatch */) => {
  return sleep(1000).then(() => {
    // simulate server latency
    if (['foo@foo.com', 'bar@bar.com'].includes(values.email)) {
      // eslint-disable-next-line no-throw-literal
      throw { email: 'Email already Exists' }
    }
  })
}