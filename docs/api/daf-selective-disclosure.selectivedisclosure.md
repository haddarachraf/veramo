<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [daf-selective-disclosure](./daf-selective-disclosure.md) &gt; [SelectiveDisclosure](./daf-selective-disclosure.selectivedisclosure.md)

## SelectiveDisclosure class

> This API is provided as a preview for developers and may change based on feedback that we receive. Do not use this API in a production environment.
> 

This class adds support for creating [Selective Disclosure](https://github.com/uport-project/specs/blob/develop/flows/selectivedisclosure.md) requests and interpret the responses received.

This implementation of the uPort protocol uses [W3C Presentation](https://www.w3.org/TR/vc-data-model/#presentations) as the response encoding instead of a `shareReq`<!-- -->.

<b>Signature:</b>

```typescript
export declare class SelectiveDisclosure implements IAgentPlugin 
```
<b>Implements:</b> [IAgentPlugin](./daf-core.iagentplugin.md)

## Constructors

|  Constructor | Modifiers | Description |
|  --- | --- | --- |
|  [(constructor)()](./daf-selective-disclosure.selectivedisclosure._constructor_.md) |  | <b><i>(BETA)</i></b> Constructs a new instance of the <code>SelectiveDisclosure</code> class |

## Properties

|  Property | Modifiers | Type | Description |
|  --- | --- | --- | --- |
|  [methods](./daf-selective-disclosure.selectivedisclosure.methods.md) |  | [ISelectiveDisclosure](./daf-selective-disclosure.iselectivedisclosure.md) | <b><i>(BETA)</i></b> |

## Methods

|  Method | Modifiers | Description |
|  --- | --- | --- |
|  [createSelectiveDisclosureRequest(args, context)](./daf-selective-disclosure.selectivedisclosure.createselectivedisclosurerequest.md) |  | <b><i>(BETA)</i></b> Creates a Selective disclosure request, encoded as a JWT. |
|  [getVerifiableCredentialsForSdr(args, context)](./daf-selective-disclosure.selectivedisclosure.getverifiablecredentialsforsdr.md) |  | <b><i>(BETA)</i></b> Gathers the required credentials necessary to fulfill a Selective Disclosure Request. It uses the [IDataStoreORM](./daf-typeorm.idatastoreorm.md) plugin to query the local database for the required credentials. |
|  [validatePresentationAgainstSdr(args, context)](./daf-selective-disclosure.selectivedisclosure.validatepresentationagainstsdr.md) |  | <b><i>(BETA)</i></b> Validates a [Selective Disclosure response](https://github.com/uport-project/specs/blob/develop/flows/selectivedisclosure.md) encoded as a <code>Presentation</code> |
