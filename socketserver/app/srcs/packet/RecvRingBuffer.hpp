#pragma once

/**
 * @brief 클라이언트의 요청을 저장하는 Buffer클래스입니다.
 */
class RecvRingBuffer
{
public:
	RecvRingBuffer() = default;

	~RecvRingBuffer()
	{ 
		delete[] m_pRingBuffer;
	}

	/**
	 * @brief 버퍼를 할당합니다.
	 * @param ringBufferSize 할당할 버퍼의 사이즈입니다.
	 * @return 버퍼의 생성 여부를 반환합니다.
	 */
	bool Create(const int ringBufferSize)
	{
		if (ringBufferSize == 0)
		{
			return false;
		}

		m_RingBufferSize = ringBufferSize;

		delete[] m_pRingBuffer;
		m_pRingBuffer = new char[m_RingBufferSize];

		Init();
		return true;
	}

	/**
	 * @brief 기본 값을 초기화합니다.
	 */
	void Init()
	{
		m_ReadPos = 0;
		m_WritePos = 0;			
	}


	/**
	 * @brief 버퍼에 데이터를 저장할 시작 주소를 반환합니다.
	 * @param wantedSize 버퍼에 저장할 데이터의 크기입니다.
	 * @return 데이터를 저장할 버퍼의 시작 주소입니다.
	 */
	char* GetWriteBuffer(const int wantedSize)
	{
		if (auto size = m_RingBufferSize - m_WritePos; size < wantedSize)
		{
			auto remain = m_WritePos - m_ReadPos;
			if (remain <= 0)
			{
				m_WritePos = 0;
				m_ReadPos = 0;
			}
			else
			{
				memcpy(&m_pRingBuffer[0], &m_pRingBuffer[m_ReadPos], remain);

				m_WritePos = remain;
				m_ReadPos = 0;
			}
		}

		return &m_pRingBuffer[m_WritePos];
	}

	/**
	 * @brief 버퍼의 데이터를 가져옵니다.
	 * @param recvSize 버퍼로부터 읽은 사이즈입니다.
	 * @return 읽을 데이터의 사이즈와 시작 주소를 반환합니다.
	 */
	std::tuple<int, char*> GetReceiveData(int recvSize)
	{
		m_WritePos += recvSize;

		auto remain = m_WritePos - m_ReadPos;
		return { remain, &m_pRingBuffer[m_ReadPos] };
	}

	/**
	 * @brief m_ReadPos를 이동합니다.
	 * @param forwardLength 이동시킬 크기입니다.
	 */
	void ForwardReadPos(const int forwardLength)
	{
		m_ReadPos += forwardLength;
	}

	/**
	 * @brief 버퍼의 총 사이즈를 반환합니다.
	 * @return 버퍼의 총 사이즈입니다.
	 */
	int GetBufferSize() { return m_RingBufferSize; }
		

private:
	/**
	 * @brief 버퍼 포인터입니다.
	 */
	char* m_pRingBuffer = nullptr;
	/**
	 * @brief 버퍼 사이즈입니다.
	 */
	int m_RingBufferSize = 0;
	/**
	 * @brief 버퍼에서 데이터를 읽어야할 위치를 나타냅니다.
	 */
	int m_ReadPos = 0;
	/**
	 * @brief 버퍼에서 데이터를 저장할 위치를 나타냅니다.
	 */
	int m_WritePos = 0;
};
