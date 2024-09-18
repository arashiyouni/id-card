
export class CicloUFG {

    CicloActual(){
        const today = new Date()
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