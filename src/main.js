import {
	bootstrapCameraKit,
	createMediaStreamSource,
	Transform2D,
} from '@snap/camera-kit'

(async function(){
	var cameraKit = await bootstrapCameraKit({ apiToken: 'eyJhbGciOiJIUzI1NiIsImtpZCI6IkNhbnZhc1MyU0hNQUNQcm9kIiwidHlwIjoiSldUIn0.eyJhdWQiOiJjYW52YXMtY2FudmFzYXBpIiwiaXNzIjoiY2FudmFzLXMyc3Rva2VuIiwibmJmIjoxNzM1MDc0MjM1LCJzdWIiOiI0OWI0MzA3Ny02NzMxLTQzNDAtOGMyMS1hNDg3ODc3Y2M4MGN-U1RBR0lOR35lZGVkZTUwNi05MDY1LTRjYTktOGMyMS03YTNkY2EyYjhkOTQifQ.eDjitNU9mupr3dmIHk7V8qTCNLBC3lkUoSG1Z4f6Vsw'})

	const session = await cameraKit.createSession()
	document.getElementById('canvas').replaceWith(session.output.live)

	const { lenses } = await cameraKit.lensRepository.loadLensGroups(['31fe4576-8c71-4970-934b-e27212ea9ccd'])

	session.applyLens(lenses[1])
	
	let mediaStream = await navigator.mediaDevices.getUserMedia({video: 
	//{ facingMode: 'environment' }
	true
	});

	const source = createMediaStreamSource(mediaStream, {
		cameraType: 'front'
	})

	await session.setSource(source)

	session.source.setRenderSize(window.innerWidth, window.innerHeight)

	session.play()
})();