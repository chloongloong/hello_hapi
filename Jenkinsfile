#!/usr/bin/env groovy

pipeline {

	environment {
		IMAGE_VER = 'v0.1'
		IMAGE_TAG = "$IMAGE_VER-$BUILD_NUMBER"
	}

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
				    //dockerImage = docker.build registry + ":$IMAGE_VER-$BUILD_NUMBER" 
				    dockerImage = docker.build registry + ":$IMAGE_TAG" 
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
				sh "docker rmi $registry:$IMAGE_TAG" 
			    }
			} 
		    }
		}
		
		stage('Trigger CD by updating deployment manifest image version') {
/*
		    parameters {
        		string(defaultValue: '0', description: 'This is a parameter', name: 'IMAGE_TAG')
    		    }	
		    param.IMAGE_TAG = "$IMAGE_VER-$BUILD_NUMBER"

		    environment {
			IMAGE_TAG = "$IMAGE_VER-$BUILD_NUMBER"
		    }
*/

		    steps {
			script {
				sh echo "$IMAGE_TAG"
				//build job: 'Hello Hapi - Trigger CD', wait: false, parameters: [string(name: 'IMAGE_TAG', value: "${IMAGE_TAG}")]
		        }	
		    }

		}

	}
}
