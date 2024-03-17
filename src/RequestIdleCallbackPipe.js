function RequestIdleCallbackPipe() {
  this.pipe = []
  this.ref = null
}

RequestIdleCallbackPipe.prototype.start = function () {
  if (this.pipe.length > 0) {
    this.ref = window.requestIdleCallback(() => {
      this.pipe.shift()()
      this.ref = null

    })
  }
}

RequestIdleCallbackPipe.prototype.push = function (f) {
  this.pipe.push(f)
  this.start()
}


const RequestIdleCallbackPipeInstance = new RequestIdleCallbackPipe()

export default RequestIdleCallbackPipeInstance