#!/usr/bin/env groovy

pipeline {

	agent none
	stages {
		stage('BUILD and TEST stages - BT stages') {
		    agent {
			docker {
			    image 'node'
			    args '-u root'
			}
		    }

		    stages {
			stage('BT - Build') {
			    steps {
				echo 'Building...'
				sh 'npm install'
			    }
			}
			stage('BT - Test') {
			    steps {
				echo 'Testing...'
				sh 'npm test'
			    }
			}
		    }
		}

		stage('CREATE and UPLOAD docker image - CU stages') {
		    environment { 
			registry = "chloong/hello-hapi" 
			registryCredential = 'dockerhub' 
			dockerImage = '' 
		    }

		    agent any 

		    stages { 
			stage('CU - Cloning our Git') { 
			    steps { 
				git 'https://github.com/chloongloong/hello_hapi.git' 
			    }
			} 

			stage('CU - Building our image') { 
			    steps { 
				script { 
				    dockerImage = docker.build registry + ":$BUILD_NUMBER" 
				}
			    } 
			}

			stage('CU - Deploy our image to registry') { 
			    steps { 
 				script { 
				    docker.withRegistry( '', registryCredential ) { 
					dockerImage.push() 
					dockerImage.push('latest')
				    }
				} 
			    }
			} 

			stage('CU - Cleaning up') { 
			    steps { 
				sh "docker rmi $registry:$BUILD_NUMBER" 
			    }
			} 
		    }
		}
	}
}
