import{_ as n,c as e,b as i,o as a}from"./app-oibmO4u6.js";const l={};function t(c,s){return a(),e("div",null,s[0]||(s[0]=[i(`<h2 id="grpc-example" tabindex="-1"><a class="header-anchor" href="#grpc-example"><span>grpc-example</span></a></h2><p>基于gRPC实现的简单rpc框架</p><h2 id="配置" tabindex="-1"><a class="header-anchor" href="#配置"><span>配置</span></a></h2><h3 id="属性配置" tabindex="-1"><a class="header-anchor" href="#属性配置"><span>属性配置</span></a></h3><p>pom.xml中配置依赖的gRPC版本号</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">	&lt;properties&gt;</span>
<span class="line">		&lt;grpc.version&gt;1.32.1&lt;/grpc.version&gt;</span>
<span class="line">		&lt;!-- Message源文件输出目录 --&gt;</span>
<span class="line">		&lt;javaOutputDirectory&gt;\${project.basedir}/src/main/java-proto&lt;/javaOutputDirectory&gt;</span>
<span class="line">		&lt;!-- gRPC源文件输出目录 --&gt;</span>
<span class="line">		&lt;protocPluginOutputDirectory&gt;\${project.basedir}/src/main/java-grpc&lt;/protocPluginOutputDirectory&gt;</span>
<span class="line">	&lt;/properties&gt;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="maven依赖" tabindex="-1"><a class="header-anchor" href="#maven依赖"><span>Maven依赖</span></a></h3><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">	&lt;dependencies&gt;</span>
<span class="line">		&lt;dependency&gt;</span>
<span class="line">			&lt;groupId&gt;io.grpc&lt;/groupId&gt;</span>
<span class="line">			&lt;artifactId&gt;grpc-netty&lt;/artifactId&gt;</span>
<span class="line">			&lt;version&gt;\${grpc.version}&lt;/version&gt;</span>
<span class="line">		&lt;/dependency&gt;</span>
<span class="line">		&lt;dependency&gt;</span>
<span class="line">			&lt;groupId&gt;io.grpc&lt;/groupId&gt;</span>
<span class="line">			&lt;artifactId&gt;grpc-protobuf&lt;/artifactId&gt;</span>
<span class="line">			&lt;version&gt;\${grpc.version}&lt;/version&gt;</span>
<span class="line">		&lt;/dependency&gt;</span>
<span class="line">		&lt;dependency&gt;</span>
<span class="line">			&lt;groupId&gt;io.grpc&lt;/groupId&gt;</span>
<span class="line">			&lt;artifactId&gt;grpc-stub&lt;/artifactId&gt;</span>
<span class="line">			&lt;version&gt;\${grpc.version}&lt;/version&gt;</span>
<span class="line">		&lt;/dependency&gt;</span>
<span class="line">		&lt;dependency&gt;</span>
<span class="line">			&lt;groupId&gt;com.alibaba&lt;/groupId&gt;</span>
<span class="line">			&lt;artifactId&gt;fastjson&lt;/artifactId&gt;</span>
<span class="line">			&lt;version&gt;1.2.74&lt;/version&gt;</span>
<span class="line">		&lt;/dependency&gt;</span>
<span class="line">		&lt;dependency&gt;</span>
<span class="line">			&lt;groupId&gt;ch.qos.logback&lt;/groupId&gt;</span>
<span class="line">			&lt;artifactId&gt;logback-classic&lt;/artifactId&gt;</span>
<span class="line">			&lt;version&gt;1.2.3&lt;/version&gt;</span>
<span class="line">		&lt;/dependency&gt;</span>
<span class="line"></span>
<span class="line">	&lt;/dependencies&gt;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="maven插件" tabindex="-1"><a class="header-anchor" href="#maven插件"><span>Maven插件</span></a></h3><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">	&lt;build&gt;</span>
<span class="line">		&lt;extensions&gt;</span>
<span class="line">			&lt;extension&gt;</span>
<span class="line">				&lt;groupId&gt;kr.motd.maven&lt;/groupId&gt;</span>
<span class="line">				&lt;artifactId&gt;os-maven-plugin&lt;/artifactId&gt;</span>
<span class="line">				&lt;version&gt;1.6.2&lt;/version&gt;</span>
<span class="line">			&lt;/extension&gt;</span>
<span class="line">		&lt;/extensions&gt;</span>
<span class="line">		&lt;plugins&gt;</span>
<span class="line">			&lt;plugin&gt;</span>
<span class="line">				&lt;groupId&gt;org.xolstice.maven.plugins&lt;/groupId&gt;</span>
<span class="line">				&lt;artifactId&gt;protobuf-maven-plugin&lt;/artifactId&gt;</span>
<span class="line">				&lt;version&gt;0.6.1&lt;/version&gt;</span>
<span class="line">				&lt;configuration&gt;</span>
<span class="line">					&lt;protocArtifact&gt;</span>
<span class="line">						com.google.protobuf:protoc:3.13.0:exe:\${os.detected.classifier}</span>
<span class="line">					&lt;/protocArtifact&gt;</span>
<span class="line">					&lt;pluginId&gt;grpc-java&lt;/pluginId&gt;</span>
<span class="line">					&lt;pluginArtifact&gt;</span>
<span class="line">						io.grpc:protoc-gen-grpc-java:1.32.1:exe:\${os.detected.classifier}</span>
<span class="line">					&lt;/pluginArtifact&gt;</span>
<span class="line">				&lt;/configuration&gt;</span>
<span class="line">				&lt;executions&gt;</span>
<span class="line">					&lt;execution&gt;</span>
<span class="line">						&lt;goals&gt;</span>
<span class="line">							&lt;goal&gt;compile&lt;/goal&gt;</span>
<span class="line">							&lt;goal&gt;compile-custom&lt;/goal&gt;</span>
<span class="line">						&lt;/goals&gt;</span>
<span class="line">					&lt;/execution&gt;</span>
<span class="line">				&lt;/executions&gt;</span>
<span class="line">			&lt;/plugin&gt;</span>
<span class="line">		&lt;/plugins&gt;</span>
<span class="line">	&lt;/build&gt;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="框架开发" tabindex="-1"><a class="header-anchor" href="#框架开发"><span>框架开发</span></a></h2><h3 id="protobuf文件" tabindex="-1"><a class="header-anchor" href="#protobuf文件"><span>Protobuf文件</span></a></h3><p>创建文件 src/main/proto/crpc_protocol.proto</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">syntax = &quot;proto3&quot;;</span>
<span class="line"></span>
<span class="line">option java_package = &quot;com.github.leeyazhou.grpc&quot;;</span>
<span class="line">option java_multiple_files = true;</span>
<span class="line">option java_outer_classname = &quot;CrpcProtocol&quot;;</span>
<span class="line"></span>
<span class="line">message RequestGrpcMessage {</span>
<span class="line">    bytes invocation = 1;</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">message ResponseGrpcMessage {</span>
<span class="line">    bytes response = 1;</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">service MessageService {</span>
<span class="line">    rpc request (RequestGrpcMessage) returns (ResponseGrpcMessage);</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>执行如下命令会生成Protobuf文件对应的Java类</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">mvn protobuf:compile </span>
<span class="line">mvn protobuf:compile-custom</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="公用基础模型类" tabindex="-1"><a class="header-anchor" href="#公用基础模型类"><span>公用基础模型类</span></a></h3><p>Invocation.java</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">package com.github.leeyazhou.grpc.core;</span>
<span class="line"></span>
<span class="line">public class Invocation {</span>
<span class="line"></span>
<span class="line">	private String serviceName;</span>
<span class="line">	private String methodName;</span>
<span class="line">	private Object[] args;</span>
<span class="line"></span>
<span class="line">	public String getServiceName() {</span>
<span class="line">		return serviceName;</span>
<span class="line">	}</span>
<span class="line"></span>
<span class="line">	public void setServiceName(String serviceName) {</span>
<span class="line">		this.serviceName = serviceName;</span>
<span class="line">	}</span>
<span class="line"></span>
<span class="line">	public String getMethodName() {</span>
<span class="line">		return methodName;</span>
<span class="line">	}</span>
<span class="line"></span>
<span class="line">	public void setMethodName(String methodName) {</span>
<span class="line">		this.methodName = methodName;</span>
<span class="line">	}</span>
<span class="line"></span>
<span class="line">	public Object[] getArgs() {</span>
<span class="line">		return args;</span>
<span class="line">	}</span>
<span class="line"></span>
<span class="line">	public void setArgs(Object[] args) {</span>
<span class="line">		this.args = args;</span>
<span class="line">	}</span>
<span class="line"></span>
<span class="line">	</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Response.java</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">package com.github.leeyazhou.grpc.core;</span>
<span class="line"></span>
<span class="line">public class Response {</span>
<span class="line"></span>
<span class="line">	private boolean error;</span>
<span class="line">	private Object response;</span>
<span class="line">	private Throwable exception;</span>
<span class="line"></span>
<span class="line">	public boolean isError() {</span>
<span class="line">		return error;</span>
<span class="line">	}</span>
<span class="line"></span>
<span class="line">	public void setError(boolean error) {</span>
<span class="line">		this.error = error;</span>
<span class="line">	}</span>
<span class="line"></span>
<span class="line">	public Object getResponse() {</span>
<span class="line">		return response;</span>
<span class="line">	}</span>
<span class="line"></span>
<span class="line">	public void setResponse(Object response) {</span>
<span class="line">		this.response = response;</span>
<span class="line">	}</span>
<span class="line"></span>
<span class="line">	public Throwable getException() {</span>
<span class="line">		return exception;</span>
<span class="line">	}</span>
<span class="line"></span>
<span class="line">	public void setException(Throwable exception) {</span>
<span class="line">		this.exception = exception;</span>
<span class="line">	}</span>
<span class="line"></span>
<span class="line">}</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="server代码" tabindex="-1"><a class="header-anchor" href="#server代码"><span>Server代码</span></a></h3><p>GrpcServer.java</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">package com.github.leeyazhou.grpc.core.server;</span>
<span class="line"></span>
<span class="line">import java.io.IOException;</span>
<span class="line"></span>
<span class="line">import io.grpc.Server;</span>
<span class="line">import io.grpc.ServerBuilder;</span>
<span class="line"></span>
<span class="line">public class GrpcServer {</span>
<span class="line">	private Server server;</span>
<span class="line">	private ServiceHandler serviceHandler;</span>
<span class="line"></span>
<span class="line">	public GrpcServer(int port) {</span>
<span class="line">		this.serviceHandler = new ServiceHandler();</span>
<span class="line">		this.server = ServerBuilder.forPort(port)</span>
<span class="line">				// 将具体实现的服务添加到gRPC服务中</span>
<span class="line">				.addService(new GrpcServerHandler(serviceHandler))</span>
<span class="line"></span>
<span class="line">				.build();</span>
<span class="line">	}</span>
<span class="line"></span>
<span class="line">	public GrpcServer addService(String name, Object service) {</span>
<span class="line">		serviceHandler.addService(name, service);</span>
<span class="line">		return this;</span>
<span class="line">	}</span>
<span class="line"></span>
<span class="line">	public void start() throws IOException {</span>
<span class="line">		server.start();</span>
<span class="line">	}</span>
<span class="line"></span>
<span class="line">	public void shutdown() {</span>
<span class="line">		server.shutdown();</span>
<span class="line">	}</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>GrpcServerHandler.java负责处理接收到的请求，并转发给ServiceHandler.java处理，处理完成后响应给请求端。</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">package com.github.leeyazhou.grpc.core.server;</span>
<span class="line"></span>
<span class="line">import com.github.leeyazhou.grpc.MessageServiceGrpc.MessageServiceImplBase;</span>
<span class="line">import com.github.leeyazhou.grpc.core.Invocation;</span>
<span class="line">import com.github.leeyazhou.grpc.core.Response;</span>
<span class="line">import com.github.leeyazhou.grpc.core.serializer.JSONSerializer;</span>
<span class="line">import com.github.leeyazhou.grpc.core.serializer.Serializer;</span>
<span class="line">import com.github.leeyazhou.grpc.RequestGrpcMessage;</span>
<span class="line">import com.github.leeyazhou.grpc.ResponseGrpcMessage;</span>
<span class="line">import com.google.protobuf.ByteString;</span>
<span class="line"></span>
<span class="line">import io.grpc.stub.StreamObserver;</span>
<span class="line"></span>
<span class="line">public class GrpcServerHandler extends MessageServiceImplBase {</span>
<span class="line">	private ServiceHandler serviceHandler;</span>
<span class="line">	private Serializer serializer = new JSONSerializer();</span>
<span class="line"></span>
<span class="line">	public GrpcServerHandler(ServiceHandler serviceHandler) {</span>
<span class="line">		this.serviceHandler = serviceHandler;</span>
<span class="line">	}</span>
<span class="line"></span>
<span class="line">	@Override</span>
<span class="line">	public void request(RequestGrpcMessage request, StreamObserver&lt;ResponseGrpcMessage&gt; responseObserver) {</span>
<span class="line">		try {</span>
<span class="line">			final Invocation invocation = serializer.deserialize(request.getInvocation().toByteArray(),</span>
<span class="line">					Invocation.class);</span>
<span class="line">			final Response response = handleRequest(invocation);</span>
<span class="line"></span>
<span class="line">			byte[] jsonByte = serializer.serialize(response);</span>
<span class="line">			ResponseGrpcMessage resp = ResponseGrpcMessage.newBuilder().setResponse(ByteString.copyFrom(jsonByte))</span>
<span class="line">					.build();</span>
<span class="line">			responseObserver.onNext(resp);</span>
<span class="line">			responseObserver.onCompleted();</span>
<span class="line">		} catch (Exception e) {</span>
<span class="line">			responseObserver.onError(e);</span>
<span class="line">		}</span>
<span class="line">	}</span>
<span class="line"></span>
<span class="line">	private Response handleRequest(Invocation invocation) {</span>
<span class="line">		Response response = new Response();</span>
<span class="line">		response.setError(false);</span>
<span class="line">		try {</span>
<span class="line">			Object ret = serviceHandler.handle(invocation);</span>
<span class="line">			response.setResponse(ret);</span>
<span class="line">		} catch (Exception e) {</span>
<span class="line">			response.setError(true);</span>
<span class="line">			response.setException(e);</span>
<span class="line">		}</span>
<span class="line">		return response;</span>
<span class="line">	}</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>ServiceHandler.java</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">package com.github.leeyazhou.grpc.core.server;</span>
<span class="line"></span>
<span class="line">import java.lang.reflect.Method;</span>
<span class="line">import java.util.Map;</span>
<span class="line">import java.util.concurrent.ConcurrentHashMap;</span>
<span class="line"></span>
<span class="line">import com.github.leeyazhou.grpc.core.Invocation;</span>
<span class="line"></span>
<span class="line">public class ServiceHandler {</span>
<span class="line">	private Map&lt;String, Object&gt; services = new ConcurrentHashMap&lt;&gt;();</span>
<span class="line">	private Map&lt;String, Method&gt; serviceMethods = new ConcurrentHashMap&lt;&gt;();</span>
<span class="line"></span>
<span class="line">	public Object handle(Invocation invocation) {</span>
<span class="line">		Object service = services.get(invocation.getServiceName());</span>
<span class="line">		Method serviceMethod = serviceMethods.get(invocation.getServiceName() + &quot;$&quot; + invocation.getMethodName());</span>
<span class="line"></span>
<span class="line">		try {</span>
<span class="line">			return serviceMethod.invoke(service, invocation.getArgs());</span>
<span class="line">		} catch (Exception e) {</span>
<span class="line">			e.printStackTrace();</span>
<span class="line">			throw new RuntimeException(e);</span>
<span class="line">		}</span>
<span class="line">	}</span>
<span class="line"></span>
<span class="line">	public void addService(String name, Object service) {</span>
<span class="line">		this.services.put(name, service);</span>
<span class="line">		Method[] methods = service.getClass().getDeclaredMethods();</span>
<span class="line">		if (methods != null) {</span>
<span class="line">			for (Method method : methods) {</span>
<span class="line">				String key = name + &quot;$&quot; + method.getName();</span>
<span class="line">				serviceMethods.put(key, method);</span>
<span class="line">			}</span>
<span class="line">		}</span>
<span class="line"></span>
<span class="line">	}</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="client代码" tabindex="-1"><a class="header-anchor" href="#client代码"><span>Client代码</span></a></h3><p>GrpcClient.java</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">package com.github.leeyazhou.grpc.core.client;</span>
<span class="line"></span>
<span class="line">import java.util.Map;</span>
<span class="line">import java.util.concurrent.ConcurrentHashMap;</span>
<span class="line"></span>
<span class="line">import com.github.leeyazhou.grpc.MessageServiceGrpc;</span>
<span class="line">import com.github.leeyazhou.grpc.RequestGrpcMessage;</span>
<span class="line">import com.github.leeyazhou.grpc.ResponseGrpcMessage;</span>
<span class="line">import com.github.leeyazhou.grpc.core.Invocation;</span>
<span class="line">import com.github.leeyazhou.grpc.core.Response;</span>
<span class="line">import com.github.leeyazhou.grpc.core.serializer.JSONSerializer;</span>
<span class="line">import com.github.leeyazhou.grpc.core.serializer.Serializer;</span>
<span class="line">import com.google.protobuf.ByteString;</span>
<span class="line"></span>
<span class="line">import io.grpc.ManagedChannel;</span>
<span class="line">import io.grpc.ManagedChannelBuilder;</span>
<span class="line"></span>
<span class="line">public class GrpcClient {</span>
<span class="line">	private final Serializer serializer = new JSONSerializer();</span>
<span class="line">	private final MessageServiceGrpc.MessageServiceBlockingStub blockingStub;</span>
<span class="line">	private static final Map&lt;String, GrpcClient&gt; clientCache = new ConcurrentHashMap&lt;&gt;();</span>
<span class="line"></span>
<span class="line">	public static GrpcClient get(String host, int port) {</span>
<span class="line">		final String key = host + &quot;:&quot; + port;</span>
<span class="line">		return clientCache.compute(key, (k1, v1) -&gt; {</span>
<span class="line">			return v1 != null ? v1 : new GrpcClient(host, port);</span>
<span class="line">		});</span>
<span class="line">	}</span>
<span class="line"></span>
<span class="line">	public GrpcClient(String host, int port) {</span>
<span class="line">		ManagedChannel managedChannel = ManagedChannelBuilder.forAddress(host, port)</span>
<span class="line">				// 使用非安全机制传输</span>
<span class="line">				.usePlaintext().build();</span>
<span class="line">		this.blockingStub = MessageServiceGrpc.newBlockingStub(managedChannel);</span>
<span class="line">	}</span>
<span class="line"></span>
<span class="line">	public Response request(Invocation invocation) {</span>
<span class="line">		byte[] jsonBytes = serializer.serialize(invocation);</span>
<span class="line">		ByteString byteString = ByteString.copyFrom(jsonBytes);</span>
<span class="line"></span>
<span class="line">		RequestGrpcMessage greeting = RequestGrpcMessage.newBuilder().setInvocation(byteString).build();</span>
<span class="line">		ResponseGrpcMessage resp = blockingStub.request(greeting);</span>
<span class="line">		byte[] responseByte = resp.getResponse().toByteArray();</span>
<span class="line">		return serializer.deserialize(responseByte, Response.class);</span>
<span class="line">	}</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="示例" tabindex="-1"><a class="header-anchor" href="#示例"><span>示例</span></a></h2><h3 id="服务类开发" tabindex="-1"><a class="header-anchor" href="#服务类开发"><span>服务类开发</span></a></h3><p>EchoService.java定义服务接口</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">public interface EchoService {</span>
<span class="line">	String echo(String echo);</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>EchoServiceImpl.java实现服务功能：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">public class EchoServiceImpl implements EchoService {</span>
<span class="line">	@Override</span>
<span class="line">	public String echo(String echo) {</span>
<span class="line">		System.err.println(&quot;回声: &quot; + echo);</span>
<span class="line">		return echo;</span>
<span class="line">	}</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="启动服务端" tabindex="-1"><a class="header-anchor" href="#启动服务端"><span>启动服务端</span></a></h3><p>GrpcProvider.java 启动Server服务，并监听端口8000</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">public class GrpcProvider {</span>
<span class="line"></span>
<span class="line">	public static void main(String[] args) throws Exception {</span>
<span class="line">		new GrpcProvider().start();</span>
<span class="line">		Thread.sleep(Integer.MAX_VALUE);</span>
<span class="line">	}</span>
<span class="line"></span>
<span class="line">	public void start() throws Exception {</span>
<span class="line">		int port = 8000;</span>
<span class="line">		GrpcServer server = new GrpcServer(port);</span>
<span class="line">		server.addService(EchoService.class.getSimpleName(), new EchoServiceImpl());</span>
<span class="line">		server.start();</span>
<span class="line">	}</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="客户端调用服务" tabindex="-1"><a class="header-anchor" href="#客户端调用服务"><span>客户端调用服务</span></a></h3><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">public class GrpcConsumer {</span>
<span class="line"></span>
<span class="line">	public static void main(String[] args) {</span>
<span class="line">		new GrpcConsumer().start();</span>
<span class="line">	}</span>
<span class="line"></span>
<span class="line">	public void start() {</span>
<span class="line">		String host = &quot;127.0.0.1&quot;;</span>
<span class="line">		int port = 8000;</span>
<span class="line">		GrpcClient client = GrpcClient.get(host, port);</span>
<span class="line"></span>
<span class="line">		Invocation invocation = new Invocation();</span>
<span class="line">		invocation.setServiceName(&quot;EchoService&quot;);</span>
<span class="line">		invocation.setMethodName(&quot;echo&quot;);</span>
<span class="line">		invocation.setArgs(new String[] { &quot;测试GRPC&quot; });</span>
<span class="line">		Response response = client.request(invocation);</span>
<span class="line">		System.out.println(response.getResponse());</span>
<span class="line">	}</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="其他" tabindex="-1"><a class="header-anchor" href="#其他"><span>其他</span></a></h2><p>源码地址<a href="https://github.com/leeyazhou/grpc-example" target="_blank" rel="noopener noreferrer">github.com/leeyazhou/grpc-example</a></p>`,44)]))}const p=n(l,[["render",t],["__file","grpc example.html.vue"]]),d=JSON.parse('{"path":"/blog/grpc/2020/grpc%20example.html","title":"grpc-example 基于gRPC实现的简单rpc框架","lang":"zh-CN","frontmatter":{"title":"grpc-example 基于gRPC实现的简单rpc框架","date":"2020-10-01T00:00:00.000Z","author":"leeyazhou","categories":["grpc"],"tags":["grpc","微服务框架"]},"headers":[{"level":2,"title":"grpc-example","slug":"grpc-example","link":"#grpc-example","children":[]},{"level":2,"title":"配置","slug":"配置","link":"#配置","children":[{"level":3,"title":"属性配置","slug":"属性配置","link":"#属性配置","children":[]},{"level":3,"title":"Maven依赖","slug":"maven依赖","link":"#maven依赖","children":[]},{"level":3,"title":"Maven插件","slug":"maven插件","link":"#maven插件","children":[]}]},{"level":2,"title":"框架开发","slug":"框架开发","link":"#框架开发","children":[{"level":3,"title":"Protobuf文件","slug":"protobuf文件","link":"#protobuf文件","children":[]},{"level":3,"title":"公用基础模型类","slug":"公用基础模型类","link":"#公用基础模型类","children":[]},{"level":3,"title":"Server代码","slug":"server代码","link":"#server代码","children":[]},{"level":3,"title":"Client代码","slug":"client代码","link":"#client代码","children":[]}]},{"level":2,"title":"示例","slug":"示例","link":"#示例","children":[{"level":3,"title":"服务类开发","slug":"服务类开发","link":"#服务类开发","children":[]},{"level":3,"title":"启动服务端","slug":"启动服务端","link":"#启动服务端","children":[]},{"level":3,"title":"客户端调用服务","slug":"客户端调用服务","link":"#客户端调用服务","children":[]}]},{"level":2,"title":"其他","slug":"其他","link":"#其他","children":[]}],"git":{"updatedTime":1734452782000,"contributors":[{"name":"leeyazhou","username":"leeyazhou","email":"bytesgo@163.com","commits":1,"url":"https://github.com/leeyazhou"}]},"filePathRelative":"blog/grpc/2020/grpc example.md","excerpt":"<h2>grpc-example</h2>\\n<p>基于gRPC实现的简单rpc框架</p>\\n<h2>配置</h2>\\n<h3>属性配置</h3>\\n<p>pom.xml中配置依赖的gRPC版本号</p>\\n<div class=\\"language-text line-numbers-mode\\" data-highlighter=\\"prismjs\\" data-ext=\\"text\\" data-title=\\"text\\"><pre><code><span class=\\"line\\">\\t&lt;properties&gt;</span>\\n<span class=\\"line\\">\\t\\t&lt;grpc.version&gt;1.32.1&lt;/grpc.version&gt;</span>\\n<span class=\\"line\\">\\t\\t&lt;!-- Message源文件输出目录 --&gt;</span>\\n<span class=\\"line\\">\\t\\t&lt;javaOutputDirectory&gt;${project.basedir}/src/main/java-proto&lt;/javaOutputDirectory&gt;</span>\\n<span class=\\"line\\">\\t\\t&lt;!-- gRPC源文件输出目录 --&gt;</span>\\n<span class=\\"line\\">\\t\\t&lt;protocPluginOutputDirectory&gt;${project.basedir}/src/main/java-grpc&lt;/protocPluginOutputDirectory&gt;</span>\\n<span class=\\"line\\">\\t&lt;/properties&gt;</span>\\n<span class=\\"line\\"></span></code></pre>\\n<div class=\\"line-numbers\\" aria-hidden=\\"true\\" style=\\"counter-reset:line-number 0\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>"}');export{p as comp,d as data};
