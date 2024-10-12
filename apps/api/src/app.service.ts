import { Injectable } from '@nestjs/common'
import { add } from '@parking-application-monorepo/sample-lib'

@Injectable()
export class AppService {
  getHello(): string {
    return `Hello Woffrld! ${add(12, 23)}`
  }
}
