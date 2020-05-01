pipeline {
  agent any
  stages {
    stage('Upload code') {
      steps {
        sh 'ssh vorms@droplet1.swart.capetown "cd /opt/apps/vorms; git pull;"'
      }
    }
    stage('Restart API') {
      steps {
        sh 'ssh vorms@droplet1.swart.capetown "cd /opt/apps/vorms; pm2 restart index"'
      }
    }
    stage('Cleanup') {
      steps {
        cleanWs()
      }
    }
  }
}