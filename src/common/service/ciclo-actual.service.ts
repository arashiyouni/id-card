
export class CicloUFG {

    CicloActual(){
        //'May 20, 24 00:20:18'
        const today = new Date('May 20, 24 00:20:18')
        const month = today.getMonth() + 1 //inicia desde 0
        const year = today.getFullYear()

        //del mes 1 hasta el 6
        if(month >=1 && month <= 6){
            return `01-${year}`
        }else{
            return `02-${year}`
        }
    }
}