import { Component, OnInit } from '@angular/core';

/*Servicios*/
import { projectService } from './service/project.service';
import { project } from './models/project';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[projectService],
})
export class AppComponent implements OnInit  {

  public projects!: project[]; //Aca se guardaran los datos del formulario.
  public Projects!:project; //Creamos una variable con el modelo
  suscription: any;

  constructor(
    private _projectService:projectService
  ){
    this.Projects=new project('','','','',''); //Creamos un nuevo project y lo guardamos en la variable Projects.
  }

  
  ngOnInit(): void {
    this.getProjects();
    this.suscription= this._projectService.refresh$.subscribe(()=>{
      this.getProjects()
    })
  }

  ngOnDestroy(): void {
    this.suscription.unsubscribe();
    console.log("Observable cerrado")
  }

  //metodo para subir registros a la base de datos.
  OnSubmit(form: any){
        /*Comprueba si hay algun dato en el campo id, si hay significa que el proyecto existe y por lo tanto estamos seleccionandolo para editarlo por eso entra en este if*/ 
        if((this.Projects._id.length>1)){ 
          this._projectService.UpdateProject(this.Projects).subscribe(
            response => {
              console.log(response.project);
            },
              error => {
                console.log(<any>error);
              }
            );
        }else{
          this._projectService.saveProject(this.Projects).subscribe(
            Response=>{
              console.log(Response)
            },
            err=>{
              console.log(err);
            }
           )
        }
  }

  //Metodo que nos devuelve todos los registros de la base de datos.
  getProjects() {
    this._projectService.getProject().subscribe(
      Response=>{
        if(Response.project){
          this.projects=Response.project;
          console.log(this.projects)
        }
      },
      error=>{
        console.log(<any>error);
      }
    )
  }

  //Metodo que nos devuelve un registro de la base de datos(esta busqueda realiza mediante un _id).
 GetProject(_id:any) {
    this._projectService.GetProject(_id).subscribe(
      Response=>{
        if(Response.project){
          this.Projects=Response.project;
          console.log(this.Projects)
        }
      },
      error=>{
        console.log(<any>error);
      }
    )
  }
  //Metodo que elimina un registro de la base de datos.
  delateProject(id: any){
    this._projectService.delateProject(id).subscribe(
      Response=>{
        if(Response.project){
          console.log(this.projects)
        }
      }
    )
  }

  
}
