import { Component, OnInit } from "@angular/core";
import { ServersService } from "../servers.service";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Observable } from "rxjs";
import { CanComponentDeactivate } from "./can-deactivate-guard.service";

@Component({
  selector: "app-edit-server",
  templateUrl: "./edit-server.component.html",
  styleUrls: ["./edit-server.component.css"]
})
export class EditServerComponent implements OnInit, CanComponentDeactivate {
  server: { id: number; name: string; status: string };
  allowEdit = false;
  changesSaved = false;

  constructor(
    private serversService: ServersService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params["id"];
    this.activatedRoute.queryParams.subscribe((queryParams: Params) => {
      this.allowEdit = queryParams["allowEdit"] === "1" ? true : false;
    });
    this.activatedRoute.fragment.subscribe();
    this.server = this.serversService.getServer(id);
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {
      name: this.server.name,
      status: this.server.status
    });
    this.changesSaved = true;
    this.router.navigate(["../"], { relativeTo: this.activatedRoute });
  }
  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.allowEdit) {
      return true;
    }

    if (!this.changesSaved) {
      return confirm("Do you want to discard the changes ?");
    } else {
      return true;
    }
  }
}
