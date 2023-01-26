import{Injectable} from '@angular/core';
import{HttpClient,HttpHeaders} from '@angular/common/http';
import{Observable, observable, pipe, Subject, tap} from 'rxjs';
import{project} from'../models/project';
import { Global } from './global';

@Injectable()

export class projectService{
    public url: string;
    private _refresh$= new Subject<void>();

    constructor(
        private _http:HttpClient
    ){
       this.url=Global.url;
    }
    get refresh$(){
        return this._refresh$;
    }


    //Este metodo obtiene todos los registros de la base de datos.
    getProject():Observable<any>{
        let headers=new HttpHeaders().set('content-Type','application/json');
        return this._http.get(this.url+'projects',{headers:headers});
    };

    //Este metodo obtiene un registro de la base de datos(la busqueda la realiza mediante el id del registro).
    GetProject(id:any):Observable<any>{
        let headers=new HttpHeaders().set('content-Type','application/json');
        return this._http.get(this.url+'project/'+id,{headers:headers});
    };

    //metodo para carga un nuevo registro a la base de datos.
    saveProject(project:project):Observable<any>{
        let params=JSON.stringify(project);
        let headers=new HttpHeaders().set('content-Type','application/json');
        return this._http.post(this.url+'project',params,{headers:headers})
        //refresca la base de datos
        .pipe(
            tap(()=>{
                this.refresh$.next();
            })
        )
    }

    //metodo para eliminar un registro a la base de datos.
    delateProject(_id:any):Observable<any>{
        let headers=new HttpHeaders().set('content-Type','application/json');
        return this._http.delete(this.url+'project/'+_id,{headers:headers})
        //refresca la base de datos
        .pipe(
            tap(()=>{
                this.refresh$.next();
            })
        )
    }

    //metodo para modificar un registro a la base de datos.
    UpdateProject(project:any):Observable<any>{
        let params=JSON.stringify(project);
        let headers=new HttpHeaders().set('content-Type','application/json');
        return this._http.put(this.url+'project/'+project._id,params,{headers:headers})

        //refresca la base de datos
        .pipe(
            tap(()=>{
                this.refresh$.next();
            })
        )
    }

    

}