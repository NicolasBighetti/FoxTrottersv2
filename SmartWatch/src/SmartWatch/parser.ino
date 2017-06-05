

bool bufferize(char * rcv){
  Serial.println(rcv);
  if(strcmp(rcv,"END") != 0){
    buf = buf + rcv;
    return false;
  }
  return true;
}

