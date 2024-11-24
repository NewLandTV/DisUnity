using System.Collections;
using TMPro;
using UnityEngine;
using UnityEngine.Networking;

public class Sender : MonoBehaviour
{
    [SerializeField]
    private TMP_InputField messageInputField;

    private bool sending;

    [SerializeField]
    private string uri;

    public void OnSendButtonClick()
    {
        if (!sending && messageInputField.text.Length > 0)
        {
            sending = true;

            StartCoroutine(SendMessageCoroutine());
        }
    }

    private IEnumerator SendMessageCoroutine()
    {
        WWWForm formData = new WWWForm();

        formData.AddField("msg", messageInputField.text);

        UnityWebRequest www = UnityWebRequest.Post(uri, formData);

        yield return www.SendWebRequest();

        if (www.isNetworkError || www.isHttpError || www.result != UnityWebRequest.Result.Success)
        {
            Debug.Log("Failed.");
        }
        else
        {
            Debug.Log("Success.");
        }

        messageInputField.text = string.Empty;
        sending = false;
    }
}
