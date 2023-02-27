const usageEmbed = {
    color: 0xFF0000,
	title: 'Content Policy',
	url: 'https://labs.openai.com/policies/content-policy',
    thumbnail: {
		url: 'https://openai.com/content/images/2022/05/openai-avatar.png',
	},
    description: 'Do not attempt to create, upload, or share images that are not G-rated or that could cause harm.',
    fields: [
		{
			name: 'Hate',
			value: 'hateful symbols, negative stereotypes, comparing certain groups to animals/objects, or otherwise expressing or promoting hate based on identity.'
		},
		{
			name: 'Harassment',
			value: 'mocking, threatening, or bullying an individual.'
		},
		{
			name: 'Violence',
			value: 'violent acts and the suffering or humiliation of others.'
		},
		{
			name: 'Self-harm',
			value: 'suicide, cutting, eating disorders, and other attempts at harming oneself.'
		},
		{
			name: 'Sexual',
			value: 'nudity, sexual acts, sexual services, or content otherwise meant to arouse sexual excitement.'
		},
        {
			name: 'Shocking',
			value: 'bodily fluids, obscene gestures, or other profane subjects that may shock or disgust.'
		},
        {
			name: 'Illegal activity',
			value: 'drug use, theft, vandalism, and other illegal activities.'
		},
        {
            name: 'Deception',
            value: 'major conspiracies or events related to major ongoing geopolitical events.'
        },
        {
            name: 'Political',
            value: 'politicians, ballot-boxes, protests, or other content that may be used to influence the political process or to campaign.' 
        },
        { 
            name: 'Public and personal health',
            value: 'the treatment, prevention, diagnosis, or transmission of diseases, or people experiencing health ailments.' 
        },
        { 
            name: 'Spam',
            value: 'unsolicited bulk content.' 
        },
	],
    timestamp: new Date().toISOString(),
}

module.exports = usageEmbed