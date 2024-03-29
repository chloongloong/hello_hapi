#!/usr/bin/env groovy

pipeline {

	environment {
		IMAGE_VER = 'v0.1'
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

		stage('Update the version in manifest & Trigger CD - UT stages') {
		    environment {
			IMAGE_TAG = "$BUILD_NUMBER"
		    }
		    agent any
		    
		    stages {
			stage('UT - Update Manifest with new version number for the newly built image') {
	
				steps {
					script {
						sh "echo $IMAGE_TAG"
						sh "echo $IMAGE_VER"
						sh "pwd"
						sh "ls -lrt"
					}	
				}			
			}
		    }
		}
	}
}
