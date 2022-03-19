import {
    AbstractControl,
    FormControl,
    FormGroup,
    ValidatorFn,
} from '@angular/forms';
// import { IMyDateModel } from 'angular-mydatepicker';

export function minMaxWordCount(min: number, max: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        var v: string = control.value;
        if (!v) return null;
        let numOfWords = v.split(' ').filter(function (n) {
            return n != '';
        }).length;
        if (numOfWords < min)
            return {
                minNumberOfWords: {
                    requiredNumber: min,
                    actualNumber: numOfWords,
                },
            };
        if (numOfWords > max)
            return {
                maxNumberOfWords: {
                    requiredNumber: max,
                    actualNumber: numOfWords,
                },
            };
        return null;
    };
}

// export function startEndDateValidation(): ValidatorFn {
//     return (group: AbstractControl): { [key: string]: any } | null => {
//         // const startDate: IMyDateModel = group.get('startDate')?.value;
//         // const endDate: IMyDateModel = group.get('endDate')?.value;
//         let jsStartDate = startDate?.singleDate?.jsDate;
//         let jsEndDate = endDate?.singleDate?.jsDate;
//         if (jsStartDate && jsEndDate) {
//             if (jsEndDate <= jsStartDate)
//                 return { endDate: 'End date must be bigger than start date' };

//             let diffTime = Math.abs(
//                 jsEndDate.getTime() - jsStartDate.getTime()
//             );
//             let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
//             if (diffDays > 30)
//                 return {
//                     dateRange:
//                         'time between start and end date cant be bigger than 30 days',
//                 };
//         }

//         return null;
//     };
// }

export function validateAllFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
        const control = formGroup.get(field);
        if (control instanceof FormControl) {
            control.markAsTouched({ onlySelf: true });
        } else if (control instanceof FormGroup) {
            validateAllFields(control);
        }
    });
}
