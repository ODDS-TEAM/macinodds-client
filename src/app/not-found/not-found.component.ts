import { Component, OnInit } from '@angular/core';
import { ErrorHandler } from '@angular/core';
import * as Raven from 'raven-js';

@Component({
    selector: 'app-not-found',
    templateUrl: './not-found.component.html',
    styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {

    lottieConfig: Object;

    private anim: any;
    private animationSpeed: number = 1;

    constructor() {
        this.lottieConfig = {
            path: '/assets/data/404-animation.json',
            autoplay: true,
            loop: true
        };
    }

    ngOnInit() {
        // Raven.captureException('User go to 404 page');
        Raven.captureMessage('User go to 404');
    }


    handleAnimation(anim: any) {
        this.anim = anim;
    }

    stop() {
        this.anim.stop();
    }

    play() {
        this.anim.play();
    }

    pause() {
        this.anim.pause();
    }

    setSpeed(speed: number) {
        this.animationSpeed = speed;
        this.anim.setSpeed(speed);
    }

}
