import { memo } from 'react';

/**
 * DemoContent is a React component used to render a demo content on the page.
 * It renders a image on the page followed by a heading, some text and a footer.
 * It also renders a quote and some content about a person being transformed into a vermin.
 */
function DemoContent() {
	return (
		<div>
			<h1 className="py-16 font-semibold">Legal Summarization Foundation Model</h1>

			<div style={{ display: 'block', position: 'relative' }}>
				<img
					src="assets/images/demo-content/dalle-rosetta.png"
					alt="beach"
					style={{
						maxWidth: '640px', /* Set to your image's width */
						width: '100%',
						float: 'left', /* This allows text to wrap around the image */
						marginRight: '20px', /* This provides space between the image and the text */
						marginBottom: '20px', /* This provides space between the image and the text that will eventually wrap below the image */
						borderRadius: '6px'
					}}
				/>

				<h4 className="pt-12 font-medium font-semibold">Introduction</h4>
				<p className='pt-12'>
					In the realm of legal documentation, characterized by extensive texts laden with specialized terminology, the advent of large-language models (LLMs) has signified a sea change in the way legal professionals assimilate and navigate information.
					Our Legal Summarization Foundation Model harnesses these advanced AI systems to sift through and synthesize lengthy legal documents, distilling them into precise, manageable summaries.
					This innovation is not merely a convenience—it represents a paradigm shift, facilitating rapid comprehension and informed decision-making.
				</p>
				<h4 className="pt-12 font-medium">The Impact of GPT-3.5 and GPT-4 on Legal Summarization</h4>
				<p className='pt-12'>
					Our summarization tool is built on the back of LLMs such as GPT-3.5 and its successor, GPT-4, both renowned for their robust training on diverse datasets, including legal texts.
					These models offer nuanced understanding of context and the ability to discern and maintain the original intent of the documents, ensuring the reliability of the summaries they produce.
					GPT-4, in particular, embodies a leap forward in AI's cognitive capabilities, exhibiting heightened sensitivity to the intricacies of legal language.
				</p>
				<h4 className="pt-12 font-medium">Emerging Specialized Models in the Legal Domain</h4>
				<p className='pt-12'>
					The landscape of summarization models is diverse, with each offering unique advantages.
					Mistral, for instance, is engineered specifically for summarization tasks, honing in on conciseness and relevance.
					On the legal front, tools like Juris-M have emerged, tailoring their algorithms to zero in on the most critical elements of legal documents.
					These models showcase how targeted AI applications can enhance specific professional tasks, such as legal review.
					The selection of a summarization model is contingent on various factors—document length, complexity, and the specificity of summarization required.
					The task is akin to finding the right key for a lock; each model presents unique capabilities that align with different types of legal documentation needs.
					The integration of LLMs into legal document workflow offers substantial benefits. The most prominent is the efficiency in handling voluminous texts, providing consistent output while minimizing human error. This automation can significantly reduce the time and labor traditionally required for legal document review.
				</p>
				<p className='pt-12'>
					Notwithstanding these advantages, challenges persist. AI summarization can sometimes oversimplify complex legal arguments or omit subtle yet legally significant nuances.
					Additionally, there's the issue of bias—AI is only as objective as the data it's trained on.
					Ensuring diversity and representativeness in training datasets is crucial to mitigate these biases.
				</p>
				<h4 className="pt-12 font-medium">The Future Role of AI in Legal Settings</h4>
				<p className='pt-12'>
					As the legal profession continues to embrace AI, the future points towards a more integrated approach where AI tools like LLMs play a central role in the day-to-day operations of legal practices.
					The iterative improvement of these models promises to refine their utility and reliability further.
				</p>
				<p className='pt-12'>
					The Legal Summarization Foundation Model represents the confluence of cutting-edge AI technology and the pressing needs of the legal profession.
					By incorporating advanced LLMs into the fabric of legal operations, we aim to empower practitioners to tackle the challenges of information overload, thereby streamlining the summarization process.
					In doing so, we pave the way for a more efficient, precise, and insightful legal profession. As AI continues to evolve, so too will the capabilities and features of our summarization tool, maintaining its place as an indispensable asset in legal analysis and practice.
				</p>
				<p className='pt-25'></p>
			</div>
		</div >
	);
}

export default memo(DemoContent);
