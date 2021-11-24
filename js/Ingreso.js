class Ingreso extends Dato{

    static countIngresos = 0;

    constructor(descripcion,valor){
        super(descripcion,valor);
        this._id = ++Ingreso.countIngresos;

    }

    get id(){
        return this._id;
    }

}