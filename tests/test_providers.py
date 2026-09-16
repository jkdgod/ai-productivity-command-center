from app.providers import ProviderError, validate_plan

def test_validation_adds_missing_lists_and_provider():
    value = validate_plan({}, 'local')
    assert value['provider'] == 'local'
    assert value['top_priorities'] == []

def test_validation_rejects_wrong_contract():
    try:
        validate_plan({'top_priorities': 'not-a-list'}, 'local')
    except ProviderError:
        return
    raise AssertionError('Expected ProviderError')
