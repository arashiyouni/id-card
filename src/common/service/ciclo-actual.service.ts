
export class CicloUFG {
    //Esto calcula el ciclo de manera automatica
    CicloActual(){
        //'May 20, 24 00:20:18'
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

    CalculateYear(){
        const today = new Date()
        const nextYear = today.getFullYear() + 1
        return nextYear.toString()
    }
}