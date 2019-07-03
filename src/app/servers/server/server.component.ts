import { Component, OnInit } from "@angular/core";

import { ServersService } from "../servers.service";
import { ActivatedRoute, Params, Router, Data } from "@angular/router";

@Component({
  selector: "app-server",
  templateUrl: "./server.component.html",
  styleUrls: ["./server.component.css"]
})
export class ServerComponent implements OnInit {
  server: { id: number; name: string; status: string };

  constructor(
    private serversService: ServersService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe((data: Data) => {
      this.server = data["server"];
    });
    // const id = +this.activatedRoute.snapshot.params["id"];
    // this.server = this.serversService.getServer(id);
    // console.log(this.server);
    // this.activatedRoute.params.subscribe((params: Params) => {
    //   this.server = this.serversService.getServer(+params["id"]);
    // });
  }
  onEdit() {
    this.router.navigate(["edit"], {
      relativeTo: this.activatedRoute,
      queryParamsHandling: "preserve"
    });
  }
}
