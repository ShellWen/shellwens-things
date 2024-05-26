/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

declare namespace App {
  interface Locals {
    runtime: import('@astrojs/cloudflare').Runtime<object>['runtime']
  }
}
