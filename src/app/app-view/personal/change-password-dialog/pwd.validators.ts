import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms"

export class PasswordValidators {
  static get matchPass(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const newpass = control.get('newPass')
      const newpassrepeat = control.get('newPassRepeat')
      if (newpass?.value !== newpassrepeat?.value) {
        const err = { noMatch: true }
        newpassrepeat?.setErrors(err)
        return err
      }
      // newpassrepeat?.setErrors(null)
      return null
    }
  }

  static get childrenRequired(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control instanceof FormGroup) {
        const hasError = Object.keys(control.controls).find(key => {
          return control.get(key)?.hasError("required")
        })
        if (hasError) {
          return {required: true}
        }
        return null
      } else {
        throw new Error("childrenRequired is only applicable on a FormGroup")
      }
    }
  }
}
