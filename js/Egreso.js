class Egreso extends Dato{

    static countEgreso = 0;

    constructor(descripcion,valor){
        super(descripcion,valor);
        this._id = ++Egreso.countEgreso;

    }

    get id(){
        return this._id;
    }

}